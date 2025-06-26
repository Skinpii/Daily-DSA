import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/router";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { arrayData } from "@/data/arrayData";
import TablePagination from "@mui/material/TablePagination";
import { useState, useMemo } from "react";
import { randomQuestion } from "@/data/randomData";

export default function Problems() {
  const router = useRouter();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ebe6ff",
      color: theme.palette.common.black,
      fontWeight: 600,
      fontSize: 15,
      //   fontFamily: "ui-sans-serif",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: 0,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      //   backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      //   border: 0,
    },
  }));

  // Helper to filter questions by topic
  const getQuestionsByTopic = (topic) =>
    arrayData.filter(q => q.topicTags && q.topicTags.some(tag => tag.name.toLowerCase().includes(topic.toLowerCase())));

  const backtrackingQuestions = useMemo(() => getQuestionsByTopic("Backtracking"), []);
  const dpQuestions = useMemo(() => getQuestionsByTopic("Dynamic Programming"), []);
  const stringQuestions = useMemo(() => getQuestionsByTopic("String"), []);
  const hashingQuestions = useMemo(() => getQuestionsByTopic("Hash Table"), []);
  const stackQuestions = useMemo(() => getQuestionsByTopic("Stack"), []);
  const treeQuestions = useMemo(() => getQuestionsByTopic("Tree"), []);
  const graphQuestions = useMemo(() => getQuestionsByTopic("Graph"), []);
  const greedyQuestions = useMemo(() => getQuestionsByTopic("Greedy"), []);

  // Helper to get topic slug
  const getTopicSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <Header />
      <div className="pt-32 text-gray-600 dark:text-gray-300" id="testimonials">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="text-2xl font-bold font-sans text-violet-600 mb-7">
            Topic Based Questions
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="group relative bg-white dark:bg-gray-800 border-2  border-violet-100 rounded-2xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/10 cursor-pointer"
              onClick={() => router.push("/problems/array")}
            >
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Arrays
                  </h5>
                </div>
                <span className="flex items-center justify-between group-hover:text-secondary">
                  <span className="text-sm font-sans text-violet-600">Solve </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#5e3aee"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {[
              "Backtracking",
              "Dynamic Programming",
              "String",
              "Hashing",
              "Stacks & Queues",
              "Trees",
              "Graphs",
              "Greedy",
            ].map((topic) => (
              <div
                key={topic}
                className="group relative bg-white dark:bg-gray-800 border-2 border-violet-100 rounded-2xl transition hover:z-[1] hover:shadow-2xl hover:shadow-violet-600/10 cursor-pointer"
                onClick={() => router.push(`/problems/${getTopicSlug(topic)}`)}
              >
                <div className="relative space-y-8 py-12 p-8">
                  <div className="space-y-2">
                    <h5 className="text-xl font-sans font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                      {topic}
                    </h5>
                  </div>
                  <span className="flex items-center justify-between group-hover:text-secondary">
                    <span className="text-sm font-sans text-violet-600">Solve </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#5e3aee"
                      className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-2xl font-bold font-sans text-violet-600 mb-3 mt-12">
            All Topics
          </div>
          <TableContainer
            component={Paper}
            className="lg:w-8/12 lg:mx-auto mt-14 border-0 flex justify-center item-center"
          >
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell>LeetCode Id</StyledTableCell> */}
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Acceptance</StyledTableCell>
                  <StyledTableCell align="left">Difficulty</StyledTableCell>
                  {/* <StyledTableCell align="left">Status</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {randomQuestion.questions.map((row, index) => (
                  <StyledTableRow key={index}>
                    {/* <StyledTableCell component="th" scope="row">
                      {row.questionId}
                    </StyledTableCell> */}
                    <StyledTableCell
                      align="left"
                      className="hover:text-violet-700 cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://leetcode.com/problems/${row.titleSlug}/`,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="">{row.acRate}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.difficulty === "Easy" ? (
                        <div className="pl-3 pr-3 font-semibold	 pt-1 pb-1 w-fit bg-green-100 text-green-500 text-xs rounded-2xl">
                          Easy
                        </div>
                      ) : row.difficulty === "Hard" ? (
                        <div className="pl-3 pr-3 font-semibold pt-1 pb-1 w-fit bg-red-100 text-red-500 text-xs rounded-2xl">
                          Hard
                        </div>
                      ) : (
                        <div className="pl-3 pr-3  font-semibold pt-1 pb-1 w-fit bg-yellow-100 text-yellow-500 text-xs rounded-2xl">
                          Medium
                        </div>
                      )}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                      <input type="checkbox" className="" />
                    </StyledTableCell> */}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            className="lg:w-8/12 lg:mx-auto"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={arrayData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          {/* Add topic-based question tables below the grid */}
          <div className="mt-16">
            <TopicTable title="Backtracking" questions={backtrackingQuestions} />
            <TopicTable title="Dynamic Programming" questions={dpQuestions} />
            <TopicTable title="String" questions={stringQuestions} />
            <TopicTable title="Hashing" questions={hashingQuestions} />
            <TopicTable title="Stacks & Queues" questions={stackQuestions} />
            <TopicTable title="Trees" questions={treeQuestions} />
            <TopicTable title="Graphs" questions={graphQuestions} />
            <TopicTable title="Greedy" questions={greedyQuestions} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function TopicTable({ title, questions }) {
  if (!questions || questions.length === 0) return null;
  return (
    <div className="mb-12">
      <div className="text-xl font-bold font-sans text-violet-600 mb-3 mt-8">{title} Questions</div>
      <TableContainer component={Paper} className="lg:w-8/12 lg:mx-auto border-0 flex justify-center item-center">
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Acceptance</TableCell>
              <TableCell align="left">Difficulty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  align="left"
                  className="hover:text-violet-700 cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://leetcode.com/problems/${row.titleSlug}/`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  {row.title}
                </TableCell>
                <TableCell align="">{row.acRate}</TableCell>
                <TableCell align="center">
                  {row.difficulty === "Easy" ? (
                    <div className="pl-3 pr-3 font-semibold pt-1 pb-1 w-fit bg-green-100 text-green-500 text-xs rounded-2xl">
                      Easy
                    </div>
                  ) : row.difficulty === "Hard" ? (
                    <div className="pl-3 pr-3 font-semibold pt-1 pb-1 w-fit bg-red-100 text-red-500 text-xs rounded-2xl">
                      Hard
                    </div>
                  ) : (
                    <div className="pl-3 pr-3  font-semibold pt-1 pb-1 w-fit bg-yellow-100 text-yellow-500 text-xs rounded-2xl">
                      Medium
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
