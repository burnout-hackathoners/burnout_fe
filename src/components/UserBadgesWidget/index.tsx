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

  const sortedCurriculums = achievements.data.filter(
    (curriculum) => curriculum.completion_percentage > 0,
  );
  sortedCurriculums.sort(
    (a, b) => b.completion_percentage - a.completion_percentage,
  );

  return (
    <section className="CollapsibleSurface__CollapsibleSection-sc-78c0a714-5 fwjoFK">
      <div className="SurfaceHeader__Section-sc-cc67cdfe-0 kpwbfn offset-bottom-md">
        <div className="SurfaceHeader__TitleWrapper-sc-cc67cdfe-1 gLAZLS offset-bottom-xsm">
          <h2 className="TitleStyles__TitleUnclickableLabel-sc-8820e942-4 iDobjJ">
            Badges
          </h2>
          <p className="SurfaceHeader__Description-sc-cc67cdfe-3 hbVhmH">
            You can get badges after completing a curriculum.
          </p>
        </div>
      </div>

      <div className="badges-wrapper CollapsibleSurface__IconWrapper-sc-78c0a714-3 idroUI">
        {sortedCurriculums.map((curriculum) => (
          <div className="content-center">
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
            {/*<p className="badge-name">Awesome</p>*/}
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserBadgesWidget;
