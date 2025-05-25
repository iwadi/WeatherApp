import '/src/App.css';
import Time from './Time';
import Date from './Date';
import DayofWeek from './DayofWeek';

function Header() {
    return (
        <>
            <div className="header">
                <span className="header-day">
                    <DayofWeek/>
                </span>
                <span className="header-time">
                    <Time/>
                </span>
                <span className="header-date">
                    <Date/>
                </span>
            </div>
        </>
    )
}

export default Header;