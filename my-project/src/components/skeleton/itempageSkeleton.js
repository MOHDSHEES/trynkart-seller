import React from "react";
import Skeleton from "react-loading-skeleton";
// import RatingSkeleton from "./ratingSkeleton";

function ItempageSkeleton() {
  return (
    <div className="item-main-container">
      <div
        style={{ justifyContent: "flex-start" }}
        className="item-image-container"
      >
        <Skeleton
          baseColor="#cdcbcb"
          highlightColor="#e6e5e5"
          duration={2}
          height={window.screen.width < 945 ? 280 : 490}
        />

        <Skeleton
          baseColor="#cdcbcb"
          highlightColor="#e6e5e5"
          duration={2}
          height={40}
        />

        <Skeleton
          baseColor="#cdcbcb"
          highlightColor="#e6e5e5"
          duration={2}
          height={40}
        />
      </div>

      <div className="item-details">
        <div className="item-name">
          <Skeleton
            baseColor="#cdcbcb"
            highlightColor="#e6e5e5"
            duration={2}
            height={100}
          />
        </div>
        <div className="item-price">
          <Skeleton baseColor="#cdcbcb" highlightColor="#e6e5e5" duration={2} />
        </div>

        <div className="item-rating ">
          <div>
            <Skeleton
              baseColor="#cdcbcb"
              highlightColor="#e6e5e5"
              duration={2}
            />
          </div>
        </div>
        {/* <div id="ratings">
          <RatingSkeleton />
        </div> */}
      </div>
    </div>
  );
}

export default ItempageSkeleton;
