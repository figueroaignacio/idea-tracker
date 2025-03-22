export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 grid grid-cols-12 gap-2 transform -skew-y-12">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="col-span-1 flex flex-col gap-2">
            {Array.from({ length: 10 }).map((_, j) => (
              <div
                key={j}
                className="h-2 rounded-full"
                style={{
                  backgroundColor: `rgba(${
                    Math.random() > 0.5 ? "0, 255, 170" : "0, 170, 255"
                  }, ${Math.random() * 0.5 + 0.2})`,
                  opacity: Math.random(),
                  height: `${Math.random() * 12 + 4}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
