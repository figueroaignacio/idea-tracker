// Components
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="hero min-h-[calc(100vh-64px)]">
        <div className="hero-content text-center max-w-5xl px-4">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Transform your ideas into reality
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
              Capture, organize, and <span className="text-accent">bring your ideas</span> to life
            </h1>

            <p className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto text-pretty leading-relaxed">
              The complete platform to track your ideas, prioritize what matters, and turn
              inspiration into action. Built for creators, innovators, and dreamers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button className="btn btn-primary  gap-2 min-w-[200px]">
                Start for free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn btn-outline  min-w-[200px]">Watch demo</button>
            </div>

            <div className="flex flex-wrap gap-6 justify-center pt-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-base-content/70">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-base-content/70">Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-base-content/70">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
