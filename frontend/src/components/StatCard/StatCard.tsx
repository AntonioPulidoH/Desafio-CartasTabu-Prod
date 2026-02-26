import "./StatCard.css";

interface StatCardProps {
  title: string;
  value: string | number;
}

export const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="card h-100 shadow-sm tabu-stat-card">
      <div className="card-body d-flex flex-column justify-content-center p-4">
        <h6 className="card-title mb-2 tabu-stat-title">{title}</h6>
        <h2 className="card-text mb-0 tabu-stat-value">{value}</h2>
      </div>
    </div>
  );
};
