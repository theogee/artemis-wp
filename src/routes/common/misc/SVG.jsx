export const CloseIcon = ({ w, h, className: parentClass, onClick }) => {
    return (
        <button onClick={onClick}>
            <svg
                width={w}
                height={h}
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
                className={parentClass + " hover:cursor-pointer"}
            >
                <path d="M12.4089 11L15.9427 7.46626C16.117 7.27626 16.2112 7.02628 16.2056 6.76849C16.2 6.51071 16.0951 6.26504 15.9127 6.08278C15.7303 5.90051 15.4846 5.79573 15.2268 5.79031C14.969 5.78489 14.7191 5.87924 14.5292 6.05368L14.5301 6.05276L10.9963 9.58651L7.46259 6.05276C7.27259 5.87845 7.02261 5.78426 6.76482 5.78985C6.50704 5.79544 6.26137 5.90038 6.07911 6.08276C5.89684 6.26514 5.79206 6.51088 5.78664 6.76867C5.78122 7.02645 5.87557 7.27638 6.05001 7.46626L6.04909 7.46535L9.58284 10.9991L6.04909 14.5328C5.94967 14.6241 5.86973 14.7345 5.81409 14.8574C5.75845 14.9803 5.72826 15.1132 5.72533 15.2481C5.72241 15.383 5.74681 15.5171 5.79707 15.6423C5.84733 15.7675 5.92241 15.8813 6.01779 15.9767C6.11316 16.0722 6.22687 16.1473 6.35205 16.1976C6.47724 16.248 6.61131 16.2725 6.74621 16.2696C6.88111 16.2668 7.01404 16.2367 7.13699 16.1811C7.25995 16.1256 7.3704 16.0457 7.46168 15.9463L7.46259 15.9454L10.9963 12.4117L14.5301 15.9454C14.6213 16.0449 14.7317 16.1248 14.8546 16.1804C14.9775 16.2361 15.1104 16.2663 15.2453 16.2692C15.3802 16.2721 15.5143 16.2477 15.6396 16.1975C15.7648 16.1472 15.8785 16.0721 15.974 15.9767C16.0694 15.8814 16.1446 15.7677 16.1949 15.6425C16.2452 15.5173 16.2697 15.3832 16.2669 15.2483C16.264 15.1134 16.2339 14.9805 16.1784 14.8575C16.1228 14.7346 16.043 14.6241 15.9436 14.5328L15.9427 14.5319L12.4089 11Z" />
            </svg>
        </button>
    );
};

export const SearchIcon = ({ w, h, className: parentClass, onClick }) => {
    return (
        <button onClick={onClick}>
            <svg
                width={w}
                height={h}
                viewBox="0 0 30 31"
                xmlns="http://www.w3.org/2000/svg"
                className={parentClass + " hover:cursor-pointer"}
            >
                <path d="M26.6973 25.2099L21.2589 19.7715C22.5683 18.0285 23.2751 15.9069 23.2727 13.7268C23.2727 8.1584 18.7423 3.62805 13.1739 3.62805C7.60548 3.62805 3.07513 8.1584 3.07513 13.7268C3.07513 19.2953 7.60548 23.8256 13.1739 23.8256C15.3539 23.828 17.4756 23.1212 19.2186 21.8119L24.657 27.2502C24.9323 27.4963 25.2913 27.6277 25.6604 27.6174C26.0295 27.607 26.3807 27.4558 26.6418 27.1947C26.9029 26.9336 27.0541 26.5825 27.0644 26.2134C27.0748 25.8443 26.9434 25.4852 26.6973 25.2099ZM5.9605 13.7268C5.9605 12.3002 6.38356 10.9055 7.17618 9.71927C7.9688 8.53303 9.09538 7.60847 10.4135 7.06251C11.7315 6.51654 13.1819 6.37369 14.5812 6.65202C15.9804 6.93035 17.2658 7.61736 18.2746 8.62618C19.2834 9.63499 19.9704 10.9203 20.2487 12.3196C20.5271 13.7188 20.3842 15.1692 19.8382 16.4873C19.2923 17.8054 18.3677 18.9319 17.1815 19.7246C15.9952 20.5172 14.6006 20.9402 13.1739 20.9402C11.2615 20.938 9.42808 20.1772 8.07579 18.825C6.72351 17.4727 5.96279 15.6392 5.9605 13.7268Z" />
            </svg>
        </button>
    );
};

export const UploadIcon = ({ w, h, className: parentClass, onClick }) => {
    return (
        <button onClick={onClick}>
            <svg
                width={w}
                height={h}
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                className={parentClass + " hover:cursor-pointer"}
            >
                <path d="M18.7967 5.33868H6.46606V25.0677H23.7289V10.2709H18.7967V5.33868ZM3.99994 4.09576C3.99994 3.42004 4.55112 2.87256 5.23054 2.87256H20.0297L26.1951 9.03787V26.2909C26.1964 26.4529 26.1657 26.6136 26.1049 26.7638C26.044 26.914 25.9542 27.0507 25.8405 27.1661C25.7267 27.2816 25.5914 27.3734 25.4421 27.4365C25.2929 27.4996 25.1327 27.5327 24.9706 27.5338H5.22437C4.90054 27.5315 4.5906 27.402 4.36149 27.1731C4.13239 26.9442 4.00252 26.6344 3.99994 26.3106V4.09576ZM16.3306 15.2032V20.1354H13.8644V15.2032H10.1653L15.0975 10.2709L20.0297 15.2032H16.3306Z" />
            </svg>
        </button>
    );
};

export const PlusIcon = ({ w, h, className: parentClass, onClick }) => {
    return (
        <button onClick={onClick}>
            <svg
                width={w}
                height={h}
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                className={parentClass}
            >
                <path d="M12.8333 6.16665H7.83333V1.16665C7.83333 0.705813 7.45999 0.333313 6.99999 0.333313C6.53999 0.333313 6.16666 0.705813 6.16666 1.16665V6.16665H1.16666C0.706662 6.16665 0.333328 6.53915 0.333328 6.99998C0.333328 7.46081 0.706662 7.83331 1.16666 7.83331H6.16666V12.8333C6.16666 13.2941 6.53999 13.6666 6.99999 13.6666C7.45999 13.6666 7.83333 13.2941 7.83333 12.8333V7.83331H12.8333C13.2933 7.83331 13.6667 7.46081 13.6667 6.99998C13.6667 6.53915 13.2933 6.16665 12.8333 6.16665" />
            </svg>
        </button>
    );
};
