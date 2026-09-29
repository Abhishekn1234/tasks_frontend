
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getMetrics
} from "../api/taskapi";

import {
  getToken
} from "../utils/auth";

const Metrics = () => {
  const [metrics, setMetrics] =
    useState(null);

  useEffect(() => {
    const loadMetrics =
      async () => {
        try {
          const data =
            await getMetrics(
              getToken()
            );

          setMetrics(
            data.metrics
          );
        } catch (error) {
          toast.error(
            "Unable to load metrics"
          );
        }
      };

    loadMetrics();
  }, []);

  if (!metrics) {
    return (
      <div className="metrics">
        Loading metrics...
      </div>
    );
  }

  return (
    <section className="metrics">
      <h2>Task Metrics</h2>

      <div className="metric-status">
        {metrics.statusBreakdown.map(
          (item) => (
            <div
              className="metric-box"
              key={item.status}
            >
              <h3>
                {item.status}
              </h3>

              <strong>
                {item.count}
              </strong>
            </div>
          )
        )}
      </div>

      <h3>
        Average Completion Time
      </h3>

      <div className="completion-list">
        {metrics.averageCompletionTime.map(
          (item) => (
            <div
              className="completion-item"
              key={item.userId}
            >
              <strong>
                {item.userName}
              </strong>

              <span>
                Completed:{" "}
                {item.completedTaskCount}
              </span>

              <span>
                Average:{" "}
                {Math.round(
                  item.averageCompletionTimeMs /
                    60000
                )}{" "}
                minutes
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Metrics;
