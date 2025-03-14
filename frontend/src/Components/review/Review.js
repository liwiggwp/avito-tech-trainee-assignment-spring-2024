import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  Button,
  Chip,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Review = ({ reviews }) => {
  const [showAllReviewIds, setShowAllReviewIds] = useState([]);

  const handleShowAllReview = (id) => {
    if (showAllReviewIds.includes(id)) {
      setShowAllReviewIds(
        showAllReviewIds.filter((reviewId) => reviewId !== id)
      );
    } else {
      setShowAllReviewIds([...showAllReviewIds, id]);
    }
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Отзывы пользователей
      </Typography>
      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Card
            key={review.id}
            sx={{
              marginBottom: 2,
              backgroundColor: "rgba(58, 58, 58, 0.39)",
            }}
          >
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar>{review.author[0]}</Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="h6" color="rgba(223, 223, 223, 0.95)">
                    {review.author}
                  </Typography>
                  <Typography variant="body2" color="grey">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                variant="h6"
                color="rgba(223, 223, 223, 0.9)"
                sx={{ marginTop: 2, fontWeight: "bold" }}
              >
                {review.title}
              </Typography>
              <Typography
                variant="body1"
                color="rgba(223, 223, 223, 0.8)"
                sx={{ marginTop: 1 }}
              >
                {showAllReviewIds.includes(review.id)
                  ? review.review
                  : `${review.review.slice(0, 1000)}...`}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <Button
                  onClick={() => handleShowAllReview(review.id)}
                  size="small"
                  sx={{
                    color: "rgba(223, 223, 223, 0.8)",
                    fontWeight: "bold",
                    backgroundColor: "rgba(22, 22, 22, 0.8)",
                    p: 1,
                  }}
                >
                  {showAllReviewIds.includes(review.id) ? "Скрыть" : "Показать"}
                </Button>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Chip
                    icon={<ThumbUpIcon color="success" />}
                    label={`${review.reviewLikes} полезно`}
                    sx={{
                      backgroundColor: "rgba(22, 22, 22, 0.8)",
                      color: "rgba(223, 223, 223, 0.8)",
                      p: 1,
                    }}
                  />
                  <Chip
                    icon={<ThumbDownIcon color="error" />}
                    label={`${review.reviewDislikes} нет`}
                    sx={{
                      backgroundColor: "rgba(22, 22, 22, 0.8)",
                      color: "rgba(223, 223, 223, 0.8)",
                      p: 1,
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default Review;
