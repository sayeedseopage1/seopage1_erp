import React, { useEffect, useState } from "react";

const CumulativeAverage = ({ Tasks, leadDevRating }) => {
    const [averageRating, setAverageRating] = useState(
        leadDevRating ? parseFloat(leadDevRating) : null
    );

    useEffect(() => {
        // Filter tasks with non-null avg_rating
        const ratedTasks = Tasks.filter((task) => task.avg_rating !== null);

        // Calculate cumulative sum of avg_rating values
        const cumulativeSum = ratedTasks.reduce((total, task) => {
            // Convert avg_rating string to number
            const rating = parseFloat(task.avg_rating);
            // Add rating to total sum
            return total + rating;
        }, 0);

        // Calculate average rating
        const newAverageRating =
            ratedTasks.length > 0 ? cumulativeSum / ratedTasks.length : null;

        // Update state with new average rating
        setAverageRating(newAverageRating);
    }, [Tasks, leadDevRating]);

    // Display loading state while calculation is in progress
    if (averageRating === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Cumulative Average: {averageRating.toFixed(2)}{" "}
            {/* Display average rating */}
        </div>
    );
};

export default CumulativeAverage;
