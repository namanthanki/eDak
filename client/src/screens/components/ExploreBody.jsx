import React from "react";
import * as moment from "moment";
import { ChatState } from "../../context/ChatProvider.jsx";

import AddFriend from "./AddFriend.jsx";

const ExploreBody = () => {
  const { filter, filters, searchResult } = ChatState();

  return (
    <div className="results-wrapper">
      {filter ? (
        <>
          {searchResult?.map((user) => {
            return (
              <>
                {filters.interests.some((u) => user.interests.includes(u)) ||
                filters.languages.some((u) => user.languages.includes(u)) ||
                filters.ageGroup.some((u) =>
                  u ===
                    moment()
                      .diff(user.dateOfBirth, "years", false)
                      .toString() || u === "55+"
                    ? moment()
                        .diff(user.dateOfBirth, "years", false)
                        .toString() >= u
                      ? true
                      : false
                    : false
                ) ? (
                  <AddFriend user={user} key={user._id} />
                ) : null}
              </>
            );
          })}
        </>
      ) : (
        <>
          {searchResult?.map((user) => (
            <AddFriend user={user} key={user._id} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExploreBody;
