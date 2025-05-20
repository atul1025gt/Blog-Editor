import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { IoHome } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale);

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const chartRef = useRef(null);

  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blogapi");
        const data = await response.json();
        setBlogsData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  if (status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }

  const publishedBlogs = blogsData.filter((dat) => dat.status === "publish");

  const monthlydata = publishedBlogs.reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear();
    const month = new Date(blog.createdAt).getMonth();
    acc[year] = acc[year] || Array(12).fill(0);
    acc[year][month]++;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();
  const labels = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Object.keys(monthlydata);

  // Create gradient colors
  const getGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255,165,0,0.9)");
    gradient.addColorStop(1, "rgba(255,140,0,0.6)");
    return gradient;
  };

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlydata[year] || Array(12).fill(0),
    backgroundColor: (context) => {
      const chart = context.chart;
      const { ctx } = chart;
      return getGradient(ctx);
    },
  }));

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs Created Monthly",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Blog Application</title>
        <meta name="description" content="Blog Application next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dashboard">
        <div className="titledashboard flex flex-sb" data-aos="fade-up">
          <div >
            <h2>
              Blogs <span>dashboard</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <IoHome />
            <span></span>
            <span>Dashboard</span>
          </div>
        </div>
        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>{publishedBlogs.length}</span>
          </div>
          <div className="four_card">
            <h2>Total Topics</h2>
            <span>10</span>
          </div>
          <div className="four_card">
            <h2>Total Tags</h2>
            <span>10</span>
          </div>
          <div className="four_card">
            <h2>Total Drafts</h2>
            <span>{blogsData.filter((ab) => ab.status === "Draft").length}</span>
          </div>
        </div>
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">
                {
                  (() => {
                    const publishedThisYear = publishedBlogs.filter(
                      (blog) =>
                        new Date(blog.createdAt).getFullYear() === currentYear
                    ).length;
                    return (
                      <>
                       
                      </>
                    );
                  })()
                }
              </h3>
            </div>
            <Bar ref={chartRef} data={data} options={options} />
          </div>
          <div className="right_salescont">
            <div>
              <h3>Blogs By Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td>Topics</td>
                    <td>Data</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Html, Css and Javascript</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>ReactJs and NextJs</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Database</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
