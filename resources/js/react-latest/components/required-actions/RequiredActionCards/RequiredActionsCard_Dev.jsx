import style from "../../../styles/required-action-card.module.css";

export default function RequiredActionsCard_Dev({ data , temp=true }) {

  return (
    <div className={style.card_container}>

        {/* card details */}
      <div className={style.details_aside}>

      {/* card body text */}
        <article className={style.article}>
          
          {/* card title */}
          <p className={style.title}>"{data.title}"</p>

          {/* card subtitle */}
          <p className={style.subtitle}>
            "<span className={style.highlight}>{data.deliverables}</span> for project <span className={style.highlight}>{data.task}</span> (PM: <span className={style.highlight}>{data.pm}</span>) from
          </p>
          
          {/* card info */}
          <div className={style.info}>
            <span>
              Client : <span className={style.highlight}>{data.client}</span>
            </span>
            <span>needs to be authorized"</span>
          </div>
        </article>

        {/* clipboard area */}
        <aside className={style.aside}>

        </aside>
      </div>

      {
        temp?
        <div className={style.action}>
          <button className={style.action_btn}>Review</button>
          <button className={style.action_btn}>Approve</button>
          <button className={style.action_btn}>Deny</button>
          <button className={style.action_btn}>Request Modifications</button>
        </div>
        :
        <div className={style.authorized_info}>
            <span>
              Authorized By : <span className={style.highlight}>Rajat Chakraborty</span>
            </span>
            <span>At 20-12-2022 10:20 Pm</span>
          </div>
      }
    </div>
  );
}
