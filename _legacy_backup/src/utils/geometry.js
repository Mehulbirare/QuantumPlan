export const snapToGrid = (value, gridSize) => {
    return Math.round(value / gridSize) * gridSize;
};

export const calculateDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

export const getAngle = (p1, p2) => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

export const findNearestPointOnWall = (point, wall) => {
    const { start, end } = wall;
    const l2 = calculateDistance(start, end) ** 2;
    if (l2 === 0) return { ...start, t: 0 };
    let t = ((point.x - start.x) * (end.x - start.x) + (point.y - start.y) * (end.y - start.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return {
        x: start.x + t * (end.x - start.x),
        y: start.y + t * (end.y - start.y),
        t: t // progress along the wall (0 to 1)
    };
};

// Shoelace formula for area calculation
export const calculateArea = (points) => {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length;
        area += points[i].x * points[j].y;
        area -= points[j].x * points[i].y;
    }
    return Math.abs(area) / 2;
};
