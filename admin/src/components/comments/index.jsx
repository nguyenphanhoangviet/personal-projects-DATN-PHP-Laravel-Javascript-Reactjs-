import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from "jquery";
import "datatables.net";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentReplies, setCommentReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentComment, setCurrentComment] = useState(null); // Bình luận hiện tại được chọn
  const [replyMessage, setReplyMessage] = useState(""); // Nội dung trả lời
  const tableInitialized = useRef(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/comments/index",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComments(response.data.comments);
        setCommentReplies(response.data.comment_reply);
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy danh sách bình luận!");
        console.error(
          "Lỗi khi lấy dữ liệu:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  useEffect(() => {
    if (!loading && comments.length > 0 && !tableInitialized.current) {
      $("#commentsTable").DataTable({
        paging: true,
        searching: true,
      });
      tableInitialized.current = true;
    }
  }, [loading, comments]);

  const toggleCommentStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = currentStatus === 1 ? 0 : 1;
      await axios.post(
        "http://localhost:8000/api/comments/allow",
        { id, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, status: newStatus } : comment
        )
      );
      alert("Đã thay đổi trạng thái bình luận thành công!");
    } catch (error) {
      setError("Đã có lỗi xảy ra khi thay đổi trạng thái bình luận!");
      console.error(
        "Lỗi khi thay đổi trạng thái:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteComment = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bình luận này không?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/comments/destroy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      setError("Đã có lỗi xảy ra khi xóa bình luận!");
      console.error(
        "Lỗi khi xóa:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const replyToComment = async () => {
    if (!currentComment || !replyMessage.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/comments/reply",
        {
          parent_id: currentComment.id,
          message: replyMessage,
          product_id: currentComment.product.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Phản hồi đã được gửi.");
      setCommentReplies([
        ...commentReplies,
        {
          id: Date.now(),
          parent_id: currentComment.id,
          message: replyMessage,
        },
      ]);
      setReplyMessage("");
    } catch (error) {
      setError("Đã có lỗi xảy ra khi gửi phản hồi!");
      console.error(
        "Lỗi khi phản hồi:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return <div>Đang tải danh sách bình luận...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 className="card-header">Danh sách bình luận</h5>
        </div>

        <div className="table-responsive text-nowrap">
          <table id="commentsTable" className="table table-bordered">
            <thead>
              <tr>
                <th>Duyệt</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Sản phẩm</th>
                <th>Nội dung</th>
                <th>Ngày</th>
                <th>Parent ID</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td>
                    <button
                      className={`btn btn-ms ${
                        comment.status === 1 ? "btn-primary" : "btn-danger"
                      }`}
                      onClick={() =>
                        toggleCommentStatus(comment.id, comment.status)
                      }
                    >
                      {comment.status === 1 ? "Duyệt" : "Bỏ duyệt"}
                    </button>
                  </td>
                  <td>{comment.name}</td>
                  <td>{comment.email}</td>
                  <td>{comment.product.name}</td>
                  <td>
                    {comment.message}
                    <button
                      className="btn btn-link text-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#commentModal"
                      onClick={() => setCurrentComment(comment)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.parent_id}</td>
                  <td>
                    <div>
                    <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={"http://localhost:3000/"}
                      >
                        <i
                          className="bx bx-show-alt me-1"
                          style={{ color: "blue" }}
                        ></i>{" "}
                        xem bình luận
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteComment(comment.id)}
                      >
                        <i
                          className="bx bx-trash me-1"
                          style={{ color: "red" }}
                        ></i>{" "}
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="commentModal"
        tabIndex="-1"
        aria-labelledby="commentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="commentModalLabel">
                Chi tiết bình luận
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {currentComment && (
                <>
                  <p>
                    <strong>Tên:</strong> {currentComment.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentComment.email}
                  </p>
                  <p>
                    <strong>Nội dung:</strong> {currentComment.message}
                  </p>
                  <p>
                    <strong>Trả lời:</strong>
                    <ul>
                      {commentReplies
                        .filter(
                          (reply) => reply.parent_id === currentComment.id
                        )
                        .map((reply) => (
                          <li key={reply.id}>{reply.message}</li>
                        ))}
                    </ul>
                  </p>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Nhập phản hồi..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  ></textarea>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary m-2"
                data-bs-dismiss="modal"
              >
                <i className="bx bx-x"></i>
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={replyToComment}
              >
                <i className="bx bx-reply me-1"></i>
                Gửi phản hồi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
