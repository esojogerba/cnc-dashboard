import { Link } from "react-router-dom";

function RunsList({ runs }) {
    return (
        <div className="runs-list">
            <div className="runs-row runs-row-header">
                <span>Run</span>
                <span>Passed</span>
                <span>Avg Discount</span>
                <span>Gambles</span>
                <span>Total Stores</span>
                <span>Bought</span>
            </div>
            {runs.map((run) => (
                <div key={run.id} className="runs-row">
                    <div className="runs-title" data-label="Run">
                        <div className="runs-title-row">
                            <span className="runs-label">{run.label}</span>
                            <Link
                                className="stat-icon stat-icon-button runs-link-button"
                                to={`/runs/${run.id}`}
                                aria-label={`Open summary for ${run.label}`}
                            >
                                <span className="material-icons-round" aria-hidden="true">
                                    open_in_new
                                </span>
                            </Link>
                        </div>
                        <span className="runs-id">{run.id}</span>
                    </div>
                    <div className="runs-metric accent-mint" data-label="Passed">
                        {run.passed}
                    </div>
                    <div className="runs-metric accent-gold" data-label="Avg Discount">
                        {run.avgDiscount}
                    </div>
                    <div className="runs-metric" data-label="Gambles">
                        {run.gambles}
                    </div>
                    <div className="runs-metric" data-label="Total Stores">
                        {run.stores}
                    </div>
                    <div className="runs-metric accent-mint" data-label="Bought">
                        {run.bought}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RunsList;
