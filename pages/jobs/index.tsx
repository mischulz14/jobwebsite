// import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getJobs, Job } from '../../database/jobs';
import css from './job.module.css';

type Props = {
  jobs: Job[];
};

export default function Jobs(props: Props) {
  return (
    <div>
      <Head>
        <title>Jobs</title>
        <meta name="Description" content="List page of all jobs" />
      </Head>
      <h1>Listed Jobs</h1>

      {props.jobs.map((job) => {
        return (
          <div data-test-id={`job-type-${job.type}`} key={`job-${job.id}`}>
            <div className={css.card}>
              <div>
                <div>
                  <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                </div>
                <h3>{job.company}</h3>
                <h2>{job.title}</h2>
                <div>
                  <span>{job.type}</span>
                  <div>
                    <span>{job.location}</span>

                    <p>Annual Salary: EUR {job.salary}</p>
                    <p>{job.description}</p>
                    <div>
                      <div></div>
                      <button className={css.apply}>
                        {' '}
                        <a href={`/jobs/${job.id}`}>Learn more</a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const jobs = await getJobs();
  return {
    // Anything that you write in this props object
    // will become the props that are passed to
    // the `Animals` page component above
    props: {
      // First prop, containing all animals
      jobs: jobs,
      // Second prop, example
      // abc: 123,
    },
  };
}
