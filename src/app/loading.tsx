const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-foreground/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-foreground animate-spin" />
        </div>
        <p className="text-sm font-medium animate-pulse text-foreground/60">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loading;