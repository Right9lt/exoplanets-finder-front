import React, { useEffect, useRef, useState } from "react";
import { Button, Slider, Stack, Typography } from "@mui/material";
import PlanetModel from "../models/PlanetModel";

interface Planet {
  planet: string;
  period_days: number;
  distance_au: number;
  radius_earth: number;
  color: string;
  displayDistance: number;
}

const OrbitExampleComponent: React.FC<{
  planetsData: PlanetModel[]
}> = ({ planetsData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  const planets: Planet[] = planetsData.map((p, index) => {

    return {
      planet: p.planet,
      period_days: p.period_days,
      distance_au: p.distance_au,
      radius_earth: p.radius_earth,
      color: getPlanetColor(p.radius_earth),
      displayDistance: 0
    };
  });


  const minDistance = Math.min(...planetsData.map(p => p.distance_au));
  const maxDistance = Math.max(...planetsData.map(p => p.distance_au));
  const canvasRadius = 300;
  const minDisplayDistance = 60;
  const maxDisplayDistance = canvasRadius - 50;

  planets.forEach((planet, index) => {
    const normalizedDistance = (planetsData[index].distance_au - minDistance) / (maxDistance - minDistance);
    planet.displayDistance = minDisplayDistance + (normalizedDistance * (maxDisplayDistance - minDisplayDistance));
  });

  function getPlanetColor(radiusEarth: number): string {
    if (radiusEarth < 1.5) {
      return "#8B8680";
    } else if (radiusEarth < 2.5) {
      return "#3B6BA5";
    } else if (radiusEarth < 4) {
      return "#1FA9D6";
    } else if (radiusEarth < 10) {
      return "#FFC649";
    } else {
      return "#B20059";
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX: number = canvas.width / 2;
    const centerY: number = canvas.height / 2;

    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
      gradient.addColorStop(0, '#FDB813');
      gradient.addColorStop(0.5, '#FDBB2D');
      gradient.addColorStop(1, '#F47920');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();

      planets.forEach((planet: Planet) => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.displayDistance, 0, Math.PI * 2);
        ctx.stroke();

        const baseSpeed = 1 / planet.period_days;
        const angle: number = (timeRef.current * baseSpeed * speed * 0.1);
        const x: number = centerX + Math.cos(angle) * planet.displayDistance;
        const y: number = centerY + Math.sin(angle) * planet.displayDistance;

        const size = Math.max(4, planet.radius_earth * 5);

        const planetGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        planetGradient.addColorStop(0, planet.color);
        planetGradient.addColorStop(1, '#000000');
        ctx.fillStyle = planetGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(x + 1, y + 1, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const labelY: number = y - size - 12;
        const labelText = `Planet ${planet.planet}`;
        const metrics: TextMetrics = ctx.measureText(labelText);
        const padding: number = 4;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(
          x - metrics.width / 2 - padding,
          labelY - 6,
          metrics.width + padding * 2,
          14
        );

        ctx.fillStyle = planet.color;
        ctx.fillText(labelText, x, labelY);
      });

      if (isPlaying) {
        timeRef.current += 1;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, planets, speed]);

  const handleReset = (): void => {
    timeRef.current = 0;
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h2">
        Approximate orbit displacement
      </Typography>
      <canvas
        ref={canvasRef}
        width={700}
        height={700}
        style={{ maxWidth: '700px', height: 'auto' }}
      />
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            variant="contained"
          >
            {isPlaying ? (
              <>
                Pause
              </>
            ) : (
              <>
                Play
              </>
            )}
          </Button>

          <Button
            onClick={handleReset}
            variant="text">
            Reset
          </Button>
        </Stack>
        <Stack>
          <Typography>Simulation speed</Typography>
          <Slider
            valueLabelDisplay="auto"
            valueLabelFormat={(x) => `${x}x`}
            min={0.1}
            max={5}
            step={0.1}
            value={speed}
            onChange={(e: Event, value: number | any, activeThumb: number) => setSpeed(value)}
          />

        </Stack>
      </Stack>
    </Stack>
  );
}

export default OrbitExampleComponent;