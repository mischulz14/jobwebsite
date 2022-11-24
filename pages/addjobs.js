import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

// import { getValidSessionByToken } from '../database/sessions';

export default function AddJob() {
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  async function addjobHandler() {
    const addjobResponse = await fetch('/api/addjob', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        company,
        title,
        type,
        location,
        salary,
        description,
      }),
    });
    const addjobResponseBody = await addjobResponse.json();

    if ('errors' in addjobResponseBody) {
      setErrors(addjobResponseBody.errors);
      return console.log(addjobResponseBody.errors);
    }
    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }
    // refresh the user on state
    // await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/jobs`);
  }
  return (
    <>
      <Head>
        <title>Add new job</title>
        <meta name="description" content="Register new users" />
      </Head>
      <h1>Add new job</h1>
      {/* {errors.map((error) => {
        return (
          <p
            css={css`
              background-color: red;
              color: white;
              padding: 5px;
            `}
            key={error.message}
          >
            Error: {error.message}
          </p>
        );
      })} */}
      <label>
        Company
        <input
          value={company}
          onChange={(event) => {
            setCompany(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Title
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Type
        <input
          value={type}
          onChange={(event) => {
            setType(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Location
        <input
          value={location}
          onChange={(event) => {
            setLocation(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Salary
        <input
          placeholder="please enter numbers only, else it won't be added"
          value={salary}
          onChange={(event) => {
            setSalary(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Description
        <textarea
          placeholder="please describe your company and the relevant job details in short sentences"
          value={description}
          onChange={(event) => {
            setDescription(event.currentTarget.value);
          }}
        />
      </label>
      <br />

      <button
        onClick={async () => {
          await addjobHandler();
        }}
      >
        Add job
      </button>
    </>
  );
}

export async function getServerSideProps(context) {
  // const token = context.req.cookies.sessionToken;

  // if (token && (await getValidSessionByToken(token))) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: true,
  //     },
  //   };
  // }

  return {
    props: {},
  };
}