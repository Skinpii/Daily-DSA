import { useRouter } from "next/router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Bookmark from "../../../images/companies/bookmark.png";
import Image from "next/image";
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
import { useState, useEffect } from "react";

export default function ProblemName() {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [solved, setSolved] = useState({});

  // Load solved state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("googleUser");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);
    const key = `solved_${user.sub}_${router.query.slug || "all"}`;
    const solvedMap = localStorage.getItem(key);
    if (solvedMap) setSolved(JSON.parse(solvedMap));
  }, [router.query.slug]);

  // Save solved state to localStorage
  const saveSolved = (newSolved) => {
    const storedUser = localStorage.getItem("googleUser");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);
    const key = `solved_${user.sub}_${router.query.slug || "all"}`;
    localStorage.setItem(key, JSON.stringify(newSolved));
  };

  const handleSolve = async (row) => {
    const storedUser = localStorage.getItem("googleUser");
    if (!storedUser) {
      alert("Please sign in with Google to track your progress.");
      return;
    }
    const user = JSON.parse(storedUser);
    const key = `${row.questionId}`;
    if (solved[key]) return; // Already solved, prevent duplicate
    // Mark as solved locally
    const newSolved = { ...solved, [key]: true };
    setSolved(newSolved);
    saveSolved(newSolved);
    // Send analytics event
    let category = "Unknown";
    if (router.query.slug) {
      category = router.query.slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
    }
    await fetch("/api/analytics/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.sub,
        question: row.title,
        category,
        date: new Date().toISOString(),
      }),
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    if ([5, 10, 25].includes(value)) {
      setRowsPerPage(value);
    } else {
      setRowsPerPage(10);
    }
    setPage(0);
  };

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

  // Filter questions by topic slug
  const topicSlug = router.query.slug;
  const filteredData = topicSlug
    ? arrayData.filter(q =>
        q.topicTags &&
        q.topicTags.some(tag =>
          tag.name.toLowerCase().replace(/\s+/g, "-").includes(topicSlug.toLowerCase())
        )
      )
    : arrayData;

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <Header />
      <div className="pt-28 text-gray-600 dark:text-gray-300" id="testimonials">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 ">
          <div className="flex flex-row ">
            <Image src={Bookmark} alt="logo" className="w-7 h-6 mt-1.5" />
            <p className="ml-2 text-2xl font-medium font-sans ">
              {router.query.slug &&
                router.query.slug.charAt(0).toUpperCase() +
                  router.query.slug.slice(1)}
            </p>
            <div></div>
          </div>
          <TableContainer
            component={Paper}
            className="lg:w-8/12 lg:mx-auto mt-14 border-0 flex justify-center item-center"
          >
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>LeetCode Id</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Acceptance</StyledTableCell>
                  <StyledTableCell align="left">Difficulty</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No questions found for this topic.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedData.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.questionId}
                      </StyledTableCell>
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
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          type="checkbox"
                          className=""
                          checked={!!solved[row.questionId]}
                          onChange={() => handleSolve(row)}
                          disabled={!!solved[row.questionId]}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
          className="lg:w-8/12 lg:mx-auto"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
