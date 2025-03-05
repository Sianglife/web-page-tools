import Link from 'next/link';
import * as Icon from 'react-bootstrap-icons';

export default function Nav() {
    return (
        <nav
            className="navbar navbar-expand-md sticky-top navigation-clean-button navbar-dark p-2"
            style={{ height: "4em", backgroundColor: "rgb(89,154,143)" }}
        >
            <div className="container">
                <Link href="/" prefetch={false} className="navbar-brand" >
                    <Icon.Tools />
                    <span className="ps-2">飛翔小工具</span>
                </Link>
                <button
                    className="navbar-toggler ml-auto"
                    data-bs-toggle="collapse"
                    type="button"
                    data-bs-target="#navcol-1"
                    aria-controls="navcol-1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse p-2 rounded" id="navcol-1"
                    style={{ backgroundColor: "rgb(89,154,143)", height: "100%" }}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/math/random" prefetch={false} className="nav-link">
                                <Icon.ArchiveFill />
                                <span className="ps-2">抽籤</span>
                            </Link>
                        </li>                        
                        <li className="nav-item">
                            <Link href="/math/factor" prefetch={false} className="nav-link">
                                <Icon.ListOl />
                                <span className="ps-2">質因數</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
};