"use client";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

const skills = [
  {
    name: "Frontend Development",
    description: "Design and develop responsive, interactive UIs using modern frameworks.",
  },
  {
    name: "Backend Development",
    description: "Build robust server-side architectures and APIs.",
  },
  {
    name: "Data Analysis",
    description: "Analyze and interpret complex data to drive business decisions.",
  },
  {
    name: "Mobile Development",
    description: "Create seamless mobile applications for iOS and Android.",
  },
  {
    name: "DevOps",
    description: "Streamline development processes with CI/CD and automation.",
  },
  {
    name: "Sales",
    description: "Leverage tech insights to drive business growth and revenue.",
  },
];

export default function SkillsSection() {
  return (
    <Container id="skills-section" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" fontWeight={700} color="#106861">
        Enhance Your Skills
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 2, mb: 4, maxWidth: "600px", mx: "auto" }}
      >
        Master the essential fields to excel in your career.
      </Typography>

      <Grid container spacing={4}>
        {skills.map((skill, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card sx={{ p: 3, textAlign: "center", boxShadow: 4, background: "#106861" }}>
                <CardContent>
                  <Typography variant="h6" color="white" fontWeight={600}>
                    {skill.name}
                  </Typography>
                  <Typography variant="body2" color="white" sx={{ mt: 1 }}>
                    {skill.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
