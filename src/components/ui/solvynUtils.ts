// Helper function to create straight paths with rounded corners
export const createCurvedPath = (x1: number, y1: number, x2: number, y2: number): string => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  // Create a path that goes horizontally first, then vertically (L-shaped with rounded corner)
  const midX = x1 + dx * 0.5;
  const midY = y1 + dy * 0.5;
  
  // Use rounded corners instead of sharp angles
  const cornerRadius = 15;
  
  // Calculate distances
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  
  if (absDx > cornerRadius * 2 && absDy > cornerRadius * 2) {
    // Determine direction
    const dirX = dx > 0 ? 1 : -1;
    const dirY = dy > 0 ? 1 : -1;
    
    // Path goes: start -> horizontal -> rounded corner -> vertical -> end
    const cornerX = midX;
    const cornerY1 = y1 + dirY * cornerRadius;
    const cornerY2 = y2 - dirY * cornerRadius;
    
    return `M ${x1} ${y1} L ${cornerX - dirX * cornerRadius} ${y1} Q ${cornerX} ${y1} ${cornerX} ${cornerY1} L ${cornerX} ${cornerY2} Q ${cornerX} ${y2} ${cornerX + dirX * cornerRadius} ${y2} L ${x2} ${y2}`;
  } else {
    // Fallback to simple straight line for very short distances
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
};

