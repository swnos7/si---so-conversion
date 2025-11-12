import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight, Link, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: 'completed' | 'in-progress' | 'pending';
  energy: number;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
}

const RadialOrbitalTimeline: React.FC<RadialOrbitalTimelineProps> = ({ timelineData, className }) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const nodeRadius = useMemo(() => Math.min(220, Math.max(160, timelineData.length * 12)), [timelineData.length]);

  useEffect(() => {
    if (!autoRotate) return undefined;
    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => {
        const next = (prev + 0.35) % 360;
        return Number(next.toFixed(3));
      });
    }, 50);
    return () => clearInterval(rotationTimer);
  }, [autoRotate]);

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex < 0) return;
    const totalNodes = timelineData.length || 1;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const nextState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        nextState[Number(key)] = false;
      });

      const isOpening = !prev[id];
      nextState[id] = isOpening;

      if (isOpening) {
        setActiveNodeId(id);
        setAutoRotate(false);
        centerViewOnNode(id);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return nextState;
    });
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radians = (angle * Math.PI) / 180;

    const x = nodeRadius * Math.cos(radians);
    const y = nodeRadius * Math.sin(radians);
    const zIndex = Math.round(100 + 50 * Math.cos(radians));
    const opacity = Math.max(0.45, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radians)) / 2)));

    return { x, y, zIndex, opacity };
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === containerRef.current || event.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={cn(
        'relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-black via-black/80 to-black px-4 py-10 text-white shadow-2xl shadow-black/40',
        className,
      )}
      style={{ minHeight: 540 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="relative z-10 flex w-full items-center justify-center">
        <div
          ref={orbitRef}
          className="relative flex w-full max-w-3xl items-center justify-center"
          style={{ minHeight: 480 }}
        >
          <div className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500">
            <div className="absolute h-24 w-24 rounded-full border border-white/20" />
            <div className="absolute h-32 w-32 rounded-full border border-white/10" />
            <div className="h-10 w-10 rounded-full bg-white/80" />
          </div>
          <div className="absolute h-[420px] w-[420px] rounded-full border border-white/10" />

          {timelineData.map((item, index) => {
            const { x, y, zIndex, opacity } = calculateNodePosition(index, timelineData.length || 1);
            const isExpanded = expandedItems[item.id];
            const Icon = item.icon;
            const isRelated = activeNodeId ? getRelatedItems(activeNodeId).includes(item.id) : false;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  zIndex: isExpanded ? 300 : zIndex,
                  opacity: isExpanded ? 1 : opacity,
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                  className={cn(
                    'relative flex h-12 w-12 items-center justify-center rounded-full border-2 text-base transition-all duration-300',
                    isExpanded
                      ? 'scale-150 border-white bg-white text-black shadow-lg shadow-white/30'
                      : isRelated
                      ? 'border-white bg-white/60 text-black'
                      : 'border-white/40 bg-black text-white',
                  )}
                >
                  <Icon size={16} />

                  {pulseEffect[item.id] && (
                    <span className="pointer-events-none absolute -inset-1 rounded-full border border-white/40 opacity-60 blur-[1px]" />
                  )}
                </button>

                <div
                  className={cn(
                    'absolute top-14 whitespace-nowrap text-xs font-semibold tracking-wider text-white/70 transition-all duration-300',
                    isExpanded && 'scale-110 text-white',
                  )}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 w-64 -translate-x-1/2 border-white/30 bg-black/90 text-white backdrop-blur-lg sm:left-1/2">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between text-xs">
                        <Badge className={cn('px-2 py-0.5 text-[10px]', {
                          'bg-black text-white border border-white': item.status === 'completed',
                          'bg-white text-black border border-black': item.status === 'in-progress',
                          'bg-black/50 text-white border border-white/40': item.status === 'pending',
                        })}
                        >
                          {item.status === 'completed'
                            ? 'COMPLETE'
                            : item.status === 'in-progress'
                            ? 'IN PROGRESS'
                            : 'PENDING'}
                        </Badge>
                        <span className="font-mono text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="mt-2 text-sm">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-xs text-white/80">
                      <p>{item.content}</p>

                      <div>
                        <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wide text-white/60">
                          <span className="flex items-center gap-1">
                            <Zap size={10} />
                            Energy
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="h-1 w-full rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="border-t border-white/10 pt-3">
                          <div className="mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide text-white/60">
                            <Link size={10} />
                            Connected Services
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((node) => node.id === relatedId);
                              if (!relatedItem) return null;
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 rounded-full border-white/20 bg-transparent px-2 text-[11px] text-white/80 hover:bg-white/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem.title}
                                  <ArrowRight size={10} className="ml-1" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadialOrbitalTimeline;
