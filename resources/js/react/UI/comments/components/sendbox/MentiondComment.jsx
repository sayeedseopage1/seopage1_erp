import { HiReply } from "react-icons/hi";
import { useCommentContext } from "../../CommentsBody";
import style from "../../styles/comments.module.css";
import { MdClose } from "react-icons/md";
import HandleFileIcon from "../../utils/HandleFileIcon";
import getFormattedTime from "../../utils/getFormattedTime";
import '../../styles/single-comment.css';


export default function MentionedComment() {
  const { mentionedComment, setMentionedComment } = useCommentContext();

  // console.log({mentionedComment});
  return (
      <div
          style={{
              borderBottom: "solid 0.5px white",
          }}
          className={`${style.chatInput_mentioned_comment}`}
      >
          <HiReply className={`${style.chatInput_mentioned_comment_icon}`} />
          <MdClose
              onClick={() => {
                  setMentionedComment(null);
              }}
              className={`${style.chatInput_mentioned_comment_close_icon}`}
          />
          <article
              className={`${style.chatInput_mentioned_comment_text_area}`}
          >
              {mentionedComment?.comment ? (
                  <span
                      className={`${style.chatInput_mentioned_comment_text_area_mssg}`}
                  >
                      <div
                          dangerouslySetInnerHTML={{
                              __html: mentionedComment?.comment,
                          }}
                          className="comment_text_container"
                      />
                  </span>
              ) : (
                  <></>
              )}

              {mentionedComment?.files_data?.length ? (
                  <span
                      className={`${style.chatInput_mentioned_comment_text_area_attachments}`}
                  >
                      {/* {console.log("=>", mentionedComment)} */}
                      {mentionedComment?.files_data?.map((file, i) => {
                          return (
                              <div
                                  key={i}
                                  className={`${style.chatInput_filePreview__file} shadow-sm`}
                              >
                                  <HandleFileIcon
                                      fileName={
                                          mentionedComment?.original_files
                                              ? mentionedComment
                                                    ?.original_files[i]
                                              : file.name
                                      }
                                      URL={file?.url}
                                  />
                              </div>
                          );
                      })}
                  </span>
              ) : (
                  <></>
              )}
              <span
                  className={`${style.chatInput_mentioned_comment_text_area_sender_time}`}
              >
                  {/* Nafis, 30 Nov, 2023 at 3:15 PM */}
                  {`${mentionedComment?.user?.name}, ${getFormattedTime(
                      mentionedComment?.created_date
                  )}`}
              </span>
          </article>
      </div>
  );
}