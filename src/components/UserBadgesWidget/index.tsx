import { Tooltip } from "react-tooltip";
import useLoadCurriculums from "../../hooks/useLoadCurriculums";
import { Avatar, BarChart } from "./Badge";
import { NoData, Errors, SpinnerLoading } from "../shared";

function UserBadgesWidget() {
  const userID = window.location.pathname.split("users/")[1];
  const {
    data: achievements,
    isFetching,
    isError,
  } = useLoadCurriculums(userID);

  if (isFetching) return <SpinnerLoading />;
  if (isError) return <Errors />;
  if (!achievements) return <NoData />;

  const completedCurriculums = achievements.data.filter(
    (curriculum) => curriculum.completion_percentage === 100,
  );
  const notCompletedCurriculums = achievements.data.filter(
    (curriculum) =>
      curriculum.completion_percentage !== 100 &&
      curriculum.completion_percentage > 0,
  );

  return (
    <section className="CollapsibleSurface__CollapsibleSection-sc-78c0a714-5 fwjoFK">
      <div className="badges-wrapper CollapsibleSurface__IconWrapper-sc-78c0a714-3 idroUI">
        {[...completedCurriculums!, ...notCompletedCurriculums!].map(
          (curriculum) => (
            <>
              {curriculum.completion_percentage > 0 && (
                <a
                  href={`/qa-team/curriculums/${curriculum.id}`}
                  key={curriculum.id}
                >
                  <Tooltip
                    id={`tooltip-${curriculum.id}`}
                    place="top"
                    content={curriculum.title}
                  />
                  <div
                    data-tooltip-id={`tooltip-${curriculum.id}`}
                    className="FlexContainer-sc-383a0367-0 Avatar__CompletionStatusAlignmentWrapper-sc-3c5e4c94-5 heWXvb dnhoxd"
                  >
                    <BarChart
                      completionPercentage={curriculum.completion_percentage}
                    />
                    <Avatar icon={curriculum.icon} />
                  </div>
                </a>
              )}
            </>
          ),
        )}
      </div>
    </section>
  );
}

export default UserBadgesWidget;
