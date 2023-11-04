import * as React from "react";
import { RadialBarChart, PolarAngleAxis, RadialBar } from "recharts";
import { Tooltip } from "react-tooltip";
import useLoadCurriculums from "./hooks/useLoadCurriculums";
import { NoData, Errors, SpinnerLoading } from "./components";

const circleSize = 76;

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

  return (
    <section className="CollapsibleSurface__CollapsibleSection-sc-78c0a714-5 fwjoFK">
      <div className="badges-wrapper CollapsibleSurface__IconWrapper-sc-78c0a714-3 idroUI">
        {achievements.data.map((curriculum) => (
          <>
            {curriculum.completion_percentage > 0 && (
              <React.Fragment key={curriculum.id}>
                <Tooltip
                  id={`tooltip-${curriculum.id}`}
                  place="top"
                  content={curriculum.title}
                />
                <div
                  data-tooltip-id={`tooltip-${curriculum.id}`}
                  className="FlexContainer-sc-383a0367-0 Avatar__CompletionStatusAlignmentWrapper-sc-3c5e4c94-5 heWXvb dnhoxd"
                >
                  <RadialBarChart
                    width={circleSize}
                    height={circleSize}
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    innerRadius={circleSize / 2 - 10}
                    outerRadius={circleSize / 2}
                    barSize={circleSize / 20}
                    data={[{ value: `${curriculum.completion_percentage}` }]}
                    startAngle={90}
                    endAngle={360 + 90}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                    />
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={circleSize / 2}
                      fill={
                        curriculum.completion_percentage === 100
                          ? "#06c6a3"
                          : "#f79550"
                      }
                      angleAxisId={0}
                    />
                  </RadialBarChart>
                  <div className="FlexContainer-sc-383a0367-0 Avatar__AvatarWrapper-sc-3c5e4c94-6 heWXvb hUYNFw">
                    <img
                      width={48}
                      height={48}
                      src="data:image/png;base64,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"
                      alt="Badge"
                    />
                  </div>
                </div>
              </React.Fragment>
            )}
          </>
        ))}
      </div>
    </section>
  );
}

export default UserBadgesWidget;
