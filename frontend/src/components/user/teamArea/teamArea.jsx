import { Link } from "react-router-dom";

export default function teamArea() {
  return (
    <div className="col-lg-3 col-md-6 col-12 col-sm-6 wow tmFadeInUp">
            <div className="team-wrap mb-45">
              <div className="team-img mb-20">
                <img src="assets/images/team/team-2.jpg" alt="" />
                <div className="team-social">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
              <div className="team-info text-center">
                <h3> William John</h3>
                <span>Labor Assistance</span>
              </div>
            </div>
          </div>
  );
}
