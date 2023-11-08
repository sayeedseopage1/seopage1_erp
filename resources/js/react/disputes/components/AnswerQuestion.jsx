import dayjs from "dayjs";
import { User } from "../../utils/user-details";

const AnswerQuestion = ({ data, index, getUserById }) => {
    const raised_by = new User(getUserById(data?.raised_by));
    const replied_by = new User(getUserById(data?.replied_by));

    // return formatted date
    const date = (date) => {
        return dayjs(date).format('[on] MMM DD, YYYY [at] hh:mm A');
    }

    return (
        <div
            className="d-flex flex-column"
            style={{ gap: 6 }}
        >
            <div className="pl-3">
                <span className="badge badge-primary">
                    Question 0 {index + 1}:
                </span>
                <span className="px-2 font-medium"> {data?.question} </span>
                <span className="d-block text-right question-by f-12">
                    -by <a href={raised_by.getUserLink()}> {raised_by?.getName()} </a> {date(data?.created_at)}
                </span>
            </div>

            <div
                className="p-3 position-relative"
                style={{ background: "#f8f8f8"}}
            >
                <div className="">
                    <p className="">
                        <span className="badge badge-success d-inline mr-1">
                            Answer:
                        </span>
                        {data?.replies ?? "Not answered yet!"}
                    </p>
                    {data?.replies && (
                        <div>
                            <span className="question-by f-12">
                                - by <a href={replied_by.getUserLink()}> {replied_by?.getName()}</a> {date(data?.replied_date)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default AnswerQuestion;
