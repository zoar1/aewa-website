"use client";

import { useEffect, useRef } from "react";

// ── Continent outlines as [lon, lat] polygons ──────────────────────────────
const CONTINENTS: [number, number][][] = [
    // Africa
    [[-6, 35], [0, 37], [5, 37], [11, 37], [15, 37], [20, 37], [25, 35], [30, 31], [32, 28],
    [35, 22], [38, 16], [43, 11], [44, 7], [43, 3], [40, 0], [41, -5], [40, -11], [36, -18],
    [34, -23], [31, -30], [28, -34], [24, -34], [19, -35], [17, -33], [16, -29], [14, -22],
    [12, -17], [10, -10], [8, -4], [5, 2], [2, 5], [0, 5], [-2, 4], [-5, 5], [-8, 5],
    [-12, 5], [-15, 9], [-17, 14], [-17, 20], [-15, 24], [-13, 27], [-8, 31], [-5, 34], [-6, 35]],

    // Europe
    [[-9, 36], [-8, 38], [-9, 42], [-8, 44], [-2, 44], [0, 46], [3, 47], [5, 48], [7, 48],
    [10, 55], [12, 56], [14, 56], [15, 57], [18, 58], [20, 60], [25, 60], [27, 58], [28, 57],
    [30, 60], [28, 65], [25, 68], [22, 70], [20, 70], [15, 70], [14, 66], [16, 62], [14, 58],
    [12, 56], [10, 54], [9, 52], [7, 50], [5, 48], [3, 44], [0, 44], [-2, 43], [-4, 43],
    [-8, 44], [-9, 44], [-10, 40], [-9, 36]],

    // Asia (main landmass)
    [[26, 36], [28, 40], [30, 42], [32, 44], [36, 42], [40, 40], [44, 42], [48, 42], [50, 40],
    [52, 38], [55, 36], [58, 34], [60, 30], [62, 26], [65, 22], [68, 20], [70, 18], [72, 16],
    [75, 12], [80, 14], [82, 18], [85, 20], [88, 22], [90, 24], [92, 22], [95, 20], [98, 18],
    [100, 16], [103, 12], [105, 10], [108, 14], [110, 18], [113, 22], [116, 24], [118, 28],
    [120, 30], [122, 32], [124, 34], [126, 36], [128, 38], [130, 40], [132, 42], [135, 44],
    [138, 42], [140, 40], [142, 38], [144, 42], [142, 48], [140, 54], [138, 58], [135, 60],
    [132, 64], [128, 68], [124, 70], [120, 72], [110, 72], [100, 68], [90, 64], [80, 60],
    [70, 56], [60, 52], [52, 48], [45, 44], [40, 42], [36, 38], [30, 36], [26, 36]],

    // North America
    [[-168, 70], [-150, 72], [-130, 70], [-125, 66], [-120, 62], [-115, 58], [-120, 54],
    [-125, 50], [-124, 42], [-124, 38], [-118, 34], [-110, 24], [-105, 20], [-100, 18],
    [-95, 18], [-90, 16], [-88, 18], [-85, 20], [-83, 22], [-80, 24], [-80, 28], [-82, 30],
    [-82, 34], [-76, 36], [-74, 38], [-70, 42], [-66, 44], [-64, 48], [-56, 50], [-52, 48],
    [-55, 52], [-58, 56], [-62, 60], [-64, 64], [-68, 68], [-72, 70], [-84, 72], [-100, 72],
    [-120, 72], [-140, 72], [-152, 70], [-168, 70]],

    // South America
    [[-82, 8], [-80, 6], [-78, 2], [-76, -2], [-74, -6], [-72, -10], [-70, -14], [-68, -18],
    [-66, -22], [-64, -26], [-62, -30], [-60, -34], [-58, -38], [-56, -40], [-54, -44],
    [-52, -48], [-54, -52], [-58, -54], [-64, -54], [-66, -50], [-68, -46], [-68, -42],
    [-66, -38], [-64, -34], [-62, -28], [-58, -22], [-54, -14], [-50, -6], [-44, 2],
    [-36, 4], [-34, 2], [-36, -2], [-40, -10], [-44, -18], [-50, -26], [-54, -34],
    [-60, -46], [-66, -54], [-70, -52], [-70, -44], [-70, -40], [-68, -34], [-64, -26],
    [-60, -20], [-56, -12], [-52, -4], [-48, 4], [-44, 8], [-60, 12], [-68, 12],
    [-72, 10], [-76, 8], [-80, 8], [-82, 8]],

    // Australia
    [[114, -22], [116, -20], [118, -18], [122, -14], [126, -14], [130, -12], [134, -12],
    [136, -14], [140, -16], [144, -18], [148, -20], [152, -24], [154, -26], [152, -28],
    [150, -30], [150, -34], [148, -36], [146, -38], [144, -38], [140, -36], [136, -34],
    [132, -32], [128, -32], [124, -34], [120, -30], [116, -26], [114, -24], [114, -22]],

    // Greenland
    [[-44, 60], [-38, 64], [-28, 68], [-18, 72], [-16, 74], [-18, 76], [-28, 80], [-40, 84],
    [-52, 82], [-58, 76], [-58, 68], [-52, 64], [-44, 60]],
];

// ── Ray-casting point-in-polygon ────────────────────────────────────────────
function pip(lon: number, lat: number, poly: [number, number][]): boolean {
    let inside = false;
    let j = poly.length - 1;
    for (let i = 0; i < poly.length; i++) {
        const [xi, yi] = poly[i];
        const [xj, yj] = poly[j];
        if ((yi > lat) !== (yj > lat) &&
            lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) {
            inside = !inside;
        }
        j = i;
    }
    return inside;
}

function isLand(lat: number, lon: number): boolean {
    while (lon > 180) lon -= 360;
    while (lon < -180) lon += 360;
    for (const poly of CONTINENTS) {
        if (pip(lon, lat, poly)) return true;
    }
    return false;
}

// ── Precompute land grid at 2.5° resolution ─────────────────────────────────
const ROWS = 72, COLS = 144;
const landGrid = new Uint8Array(ROWS * COLS);
for (let r = 0; r < ROWS; r++) {
    const lat = -90 + (180 / ROWS) * (r + 0.5);
    for (let c = 0; c < COLS; c++) {
        const lon = -180 + (360 / COLS) * (c + 0.5);
        landGrid[r * COLS + c] = isLand(lat, lon) ? 1 : 0;
    }
}

interface RotatingGlobeProps {
    size?: number;
    className?: string;
}

export default function RotatingGlobe({ size = 440, className }: RotatingGlobeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const SIZE = size;
        canvas.width = SIZE;
        canvas.height = SIZE;
        const cx = SIZE / 2, cy = SIZE / 2, R = SIZE * 0.44;
        let rotation = 0;

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, SIZE, SIZE);

            const dots: {
                sx: number; sy: number; depth: number;
                dotR: number; land: boolean; z: number;
            }[] = [];

            for (let r = 0; r < ROWS; r++) {
                const lat = -90 + (180 / ROWS) * (r + 0.5);
                const latRad = lat * Math.PI / 180;
                const cosLat = Math.cos(latRad);
                const sinLat = Math.sin(latRad);
                for (let c = 0; c < COLS; c++) {
                    const lon = -180 + (360 / COLS) * (c + 0.5);
                    const lonRad = (lon + rotation) * Math.PI / 180;
                    const x = cosLat * Math.sin(lonRad);
                    const y = -sinLat;
                    const z = cosLat * Math.cos(lonRad);
                    if (z < 0) continue;
                    dots.push({
                        sx: cx + x * R,
                        sy: cy + y * R,
                        depth: 0.3 + z * 0.7,
                        dotR: 1.6 * (0.4 + z * 0.6),
                        land: landGrid[r * COLS + c] === 1,
                        z,
                    });
                }
            }

            dots.sort((a, b) => a.z - b.z);

            for (const d of dots) {
                ctx.beginPath();
                ctx.arc(d.sx, d.sy, d.dotR, 0, Math.PI * 2);
                ctx.fillStyle = d.land
                    ? `rgba(0,0,0,${d.depth.toFixed(2)})`
                    : `rgba(0,0,0,${(d.depth * 0.10).toFixed(2)})`;
                ctx.fill();
            }
        }

        function animate() {
            rotation += 0.15;
            draw();
            rafRef.current = requestAnimationFrame(animate);
        }

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
        };
    }, [size]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ display: "block", background: "transparent" }}
        />
    );
}
