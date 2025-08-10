import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOptionsContext } from 'src/providers/Options';

const COLORS = ['#ec003f', '#efb100', '#00c951', '#2b7fff'];

const MIN_SIZE = 360;
// tailwind
const MIN_WIDTH = 'min-w-[360px]';
const MIN_HEIGHT = 'min-h-[360px]';

const WheelOfNames: React.FC = () => {
  const { availables } = useOptionsContext();
  const sections = availables;
  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentSize, setCurrentSize] = useState(0);
  const [result, setResult] = useState('');
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [colors, setColors] = useState<string[]>([]);

  const resize = useCallback(() => {
    let size;
    if (mainRef.current) {
      const mainSize = Math.min(
        mainRef.current.clientHeight,
        mainRef.current.clientWidth,
      );
      size = mainSize > MIN_SIZE ? mainSize : MIN_SIZE;
    } else {
      if (currentSize === 0) return;
      size = currentSize;
    }
    setCurrentSize(size);
  }, [currentSize]);

  useEffect(() => {
    resize();
  }, [resize]);

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  const calcColorOrder = useCallback((): string[] => {
    const result = [];
    // ループ回数
    const loop = Math.floor(sections.length / COLORS.length) + 1;
    const remainder = sections.length % COLORS.length;
    let previousColor = '';
    let nextColor = '';
    for (let i = 0; i < loop; i++) {
      let outerColor = COLORS.filter(
        color => color !== previousColor && color != nextColor,
      );
      let innerColor;
      if (outerColor.length > 2) {
        innerColor = outerColor.slice(2);
        outerColor = outerColor.slice(0, 2);
      } else {
        innerColor = COLORS.filter(color => !outerColor.includes(color));
      }

      if (i === 0) {
        // 先頭は変化しないので初回だけ
        nextColor = outerColor[0];
      }
      previousColor = outerColor[1];

      // 結果を順番に入れる
      if (i < loop - 1) {
        result.push(outerColor[0]);
        innerColor.forEach(color => result.push(color));
        result.push(outerColor[1]);
      } else {
        // 最終ループの処理
        innerColor = innerColor.slice(0, remainder - 2);
        switch (remainder) {
          case 0:
            break;
          case 1:
            result.push(outerColor[0]);
            break;
          default:
            result.push(outerColor[0]);
            innerColor.forEach(color => result.push(color));
            result.push(outerColor[1]);
            break;
        }
      }
    }

    return result;
  }, [sections]);

  // アニメーション設定
  const duration = 10000; // 回転時間(s)
  const baseRotation = 360 * 20;

  // 描画設定
  const pointerMargin = 20; // ポインターのはみ出し幅
  const anglePerSection = (2 * Math.PI) / sections.length;

  // 円を描画
  const drawWheel = useCallback(
    (canvasContext: CanvasRenderingContext2D, rotation: number) => {
      if (currentSize === 0) return;

      const radius = (currentSize - pointerMargin * 2) / 2;
      const centerX = currentSize / 2;
      const centerY = radius + pointerMargin;

      canvasContext.clearRect(0, 0, currentSize, currentSize);

      let sectionColors = colors;
      if (colors.length !== sections.length) {
        sectionColors = calcColorOrder();
        setColors(sectionColors);
      }

      for (let i = 0; i < sections.length; i++) {
        const startAngle = i * anglePerSection + rotation;
        const endAngle = startAngle + anglePerSection;

        // セクションの塗りつぶし
        canvasContext.beginPath();
        canvasContext.moveTo(centerX, centerY);
        canvasContext.arc(centerX, centerY, radius, startAngle, endAngle);
        canvasContext.closePath();
        canvasContext.fillStyle = sectionColors[i];
        canvasContext.fill();

        // セクションのテキストを描画
        const text = sections[i];
        const textAngle = startAngle + anglePerSection / 2;
        const textX = centerX + Math.cos(textAngle) * (radius - 10);
        const textY = centerY + Math.sin(textAngle) * (radius - 10);

        canvasContext.save();
        canvasContext.translate(textX, textY);
        canvasContext.rotate(textAngle);
        canvasContext.fillStyle = 'black';

        // フォントサイズ調整
        let fontSize = 56;
        while (fontSize > 1) {
          canvasContext.font = `bold ${fontSize}px san-serif`;
          const textWidth = canvasContext.measureText(text).width;
          if (textWidth <= (currentSize / 2) * 0.6) break;
          fontSize--;
        }
        canvasContext.textAlign = 'end';
        canvasContext.textBaseline = 'middle';
        canvasContext.fillText(text, 0, 0);
        canvasContext.restore();
      }

      // ルーレットの枠線を描画
      canvasContext.beginPath();
      canvasContext.arc(centerX, centerY, radius - 1, 0, 2 * Math.PI);
      canvasContext.lineWidth = 1;
      canvasContext.strokeStyle = 'black';
      canvasContext.stroke();

      // 中心円を描画
      canvasContext.save();
      canvasContext.shadowColor = 'rgba(0, 0, 0, 0.4)';
      canvasContext.shadowBlur = 6;
      canvasContext.shadowOffsetX = 0;
      canvasContext.shadowOffsetY = 4;
      canvasContext.beginPath();
      canvasContext.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
      canvasContext.fillStyle = 'white';
      canvasContext.fill();
      canvasContext.restore();

      // ポインターを描画
      const pointerX = centerX + radius + 10;
      const pointerY = centerY;

      canvasContext.save();
      canvasContext.shadowColor = 'rgba(0, 0, 0, 0.4)';
      canvasContext.shadowBlur = 5;
      canvasContext.shadowOffsetX = 2;
      canvasContext.shadowOffsetY = 3;
      canvasContext.beginPath();
      canvasContext.moveTo(pointerX - 80, pointerY);
      canvasContext.lineTo(pointerX, pointerY - 15);
      canvasContext.lineTo(pointerX, pointerY + 15);
      canvasContext.closePath();
      canvasContext.fillStyle = 'black';
      canvasContext.fill();
      canvasContext.restore();
    },
    [sections, colors, currentSize, anglePerSection, calcColorOrder],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return;

    drawWheel(canvasContext, angle);
  }, [angle, drawWheel]);

  const easeOut = (progress: number): number => {
    return 1 - Math.pow(1 - progress, 3);
  };

  // 回転処理
  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult('');

    const extraRotation = Math.floor(Math.random() * 360); // 追加回転角度
    const totalRotation = baseRotation + extraRotation;
    const totalRadians = (totalRotation * Math.PI) / 180;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentAngle = totalRadians * easeOut(progress);

      if (elapsedTime >= duration) {
        setSpinning(false);

        // 結果を取得
        const finalAngle = currentAngle % (2 * Math.PI);
        setAngle(finalAngle);
        const index =
          (sections.length - Math.floor(finalAngle / anglePerSection) - 1) %
          sections.length;
        setResult(sections[index]);

        return;
      }

      setAngle(currentAngle);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      <div
        ref={mainRef}
        className={`relative flex h-full w-full justify-center ${MIN_WIDTH} ${MIN_HEIGHT}`}
      >
        <canvas
          ref={canvasRef}
          width={currentSize}
          height={currentSize}
          onClick={spin}
          className="absolute rounded-[50%] hover:cursor-pointer"
        />
      </div>
      <Dialog
        open={result !== ''}
        onClose={() => setResult('')}
        className="relative z-50 transition-all"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <DialogPanel className="bg-bg dark:bg-bg-dark w-[80%] rounded-2xl text-xl shadow-xl md:text-4xl">
            <DialogTitle className="bg-primary text-text-dark rounded-t-2xl p-3 md:p-6">
              The one that was chosen is
            </DialogTitle>
            <p className="flex justify-center py-3 text-4xl md:py-6 md:text-8xl">
              {result}
            </p>
            <div className="flex justify-end p-2 md:p-4">
              <button
                className="bg-primary text-text-dark p-2 md:p-4"
                onClick={() => setResult('')}
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default WheelOfNames;
