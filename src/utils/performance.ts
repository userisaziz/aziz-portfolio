// Performance monitoring utilities

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
    this.measurePageLoad();
  }

  private initializeObservers() {
    // Observe paint metrics
    if ('PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.firstContentfulPaint = entry.startTime;
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(paintObserver);
      } catch (e) {
        console.warn('Paint observer not supported');
      }

      // Observe LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.largestContentfulPaint = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // Observe CLS
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.metrics.cumulativeLayoutShift = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // Observe FID
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }
    }
  }

  private measurePageLoad() {
    if (document.readyState === 'complete') {
      this.calculatePageLoadMetrics();
    } else {
      window.addEventListener('load', () => {
        this.calculatePageLoadMetrics();
      });
    }
  }

  private calculatePageLoadMetrics() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      }
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public logMetrics(): void {
    console.group('📊 Performance Metrics');
    console.table(this.metrics);
    console.groupEnd();
  }

  public sendToAnalytics(endpoint?: string): void {
    const metricsToSend = {
      ...this.metrics,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metricsToSend)
      }).catch(err => console.warn('Failed to send metrics:', err));
    } else {
      // For development - just log to console
      console.log('Analytics Data:', metricsToSend);
    }
  }

  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Initialize performance monitoring
let performanceMonitor: PerformanceMonitor | null = null;

export const initPerformanceMonitoring = (): PerformanceMonitor => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
    
    // Log metrics after page load
    setTimeout(() => {
      performanceMonitor?.logMetrics();
    }, 3000);
    
    // Send to analytics on page unload
    window.addEventListener('beforeunload', () => {
      performanceMonitor?.sendToAnalytics();
    });
  }
  
  return performanceMonitor;
};

export const getPerformanceMetrics = (): Partial<PerformanceMetrics> => {
  return performanceMonitor?.getMetrics() || {};
};

// Web Vitals scoring
export const getWebVitalsScore = () => {
  const metrics = getPerformanceMetrics();
  const scores = {
    lcp: getScore(metrics.largestContentfulPaint, [2500, 4000]), // Good < 2.5s, Poor > 4s
    fid: getScore(metrics.firstInputDelay, [100, 300]), // Good < 100ms, Poor > 300ms
    cls: getScore(metrics.cumulativeLayoutShift, [0.1, 0.25]) // Good < 0.1, Poor > 0.25
  };
  
  const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
  
  return {
    individual: scores,
    overall: overallScore,
    rating: overallScore >= 0.9 ? 'good' : overallScore >= 0.5 ? 'needs-improvement' : 'poor'
  };
};

function getScore(value: number | undefined, thresholds: [number, number]): number {
  if (value === undefined) return 0;
  if (value <= thresholds[0]) return 1; // Good
  if (value <= thresholds[1]) return 0.5; // Needs improvement
  return 0; // Poor
}