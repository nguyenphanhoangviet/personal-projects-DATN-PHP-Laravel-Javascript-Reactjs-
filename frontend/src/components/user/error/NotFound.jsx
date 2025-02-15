import React from "react";

const NotFound = () => {
  return (
    <div class="main-wrapper">
        <div class="error-area">
            <div class="container">
                <div class="row align-items-center height-100vh">
                    <div class="col-lg-8 ml-auto mr-auto">
                        <div class="error-content text-center">
                            <div class="error-logo">
                                <a href='index.html'><img src="assets/images/logo/logo.png" alt="logo" /></a>
                            </div>
                            <div class="error-img">
                                <img src="assets/images/banner/page-404-image.jpg" alt="" />
                            </div>
                            <h2> Oops! That page can’t be found.</h2>
                            <p> It looks like nothing was found at this location. Maybe try one of the links below or a search?</p>
                            <div class="search-style-4">
                                <form action="#">
                                    <input type="text" placeholder="Search… " />
                                    <button type="submit"> Search </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NotFound;
