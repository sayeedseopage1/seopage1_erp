import { FaUserCircle } from "react-icons/fa";
import { Placeholder } from "../../../../../../ui/Placeholder";
import style from "../../../../../../styles/required-action-card.module.css";


// project challenge
export default function ProjectChallenge({ data, loading }){
  if (loading) {
      return (
          <div className={`sp1_st--approve-card mb-3`}>
              <div className="sp1_st--approve-card-header">
                  <Placeholder />
              </div>

              <div className="sp1_st--approve-card-body">
                  <div className="mb-2">
                      <div
                          className="font-weight-bold f-12"
                          style={{ color: "#81868E" }}
                      >
                          <Placeholder />
                      </div>
                  </div>

                  <div className="mb-2">
                      <div
                          className="font-weight-bold f-12"
                          style={{ color: "#81868E" }}
                      >
                          <Placeholder />
                      </div>
                      <div className="sp1_ck_content py-2">
                          <Placeholder />
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  return (
      <div className={`sp1_st--approve-card mb-3`}>
          <div className="sp1_st--approve-card-header">
              {data?.project_name.toUpperCase()}
          </div>

          <div className="sp1_st--approve-card-body">

              <div className="mb-2">
                  <div
                      className="font-weight-bold f-12"
                      style={{
                          color: "#81868E",
                          display: "inline-flex",
                          gap: "5px",
                          alignItems: "center",
                      }}
                  >
                      <span>Project Manager :</span>
                      <span style={{display:'inline-flex',gap:'3px',alignItems:'center'}}>
                          <FaUserCircle
                              style={{ height: "15px", width: "15px" }}
                          />
                          <a
                              className={style.highlight}
                              href={`http://127.0.0.1:8000/account/employees/${data.project_manager_id}`}
                          >
                              {data.project_manager_name}
                          </a>
                      </span>
                  </div>
              </div>

              <div className="mb-2">
                  <div
                      className="font-weight-bold f-12"
                      style={{
                          color: "#81868E",
                          display: "inline-flex",
                          gap: "5px",
                          alignItems: "center",
                      }}
                  >
                      <span>Client :</span>
                      <span style={{display:'inline-flex',gap:'3px',alignItems:'center'}}>
                          <FaUserCircle
                              style={{ height: "15px", width: "15px" }}
                          />
                          <a
                              className={style.highlight}
                              href={`http://127.0.0.1:8000/account/clients/${data.clientId}`}
                          >
                              {data.client_name}
                          </a>
                      </span>
                  </div>
              </div>

              <div className="mb-2">
                  <div
                      className="font-weight-bold f-12"
                      style={{ color: "#81868E" }}
                  >
                      Comments :
                  </div>
                  <div
                      className="sp1_ck_content py-2"
                      dangerouslySetInnerHTML={{
                          __html: data.comments,
                      }}/>
              </div>

              <div className="mb-2">
                  <div
                      className="font-weight-bold f-12"
                      style={{ color: "#81868E" }}
                  >
                      Project Challenge :
                  </div>
                  <div
                      className="sp1_ck_content py-2"
                      dangerouslySetInnerHTML={{
                          __html: data?.project_challenge ?? '<span>No project challange available</span>',
                      }}/>
              </div>
          </div>
      </div>
  );
};