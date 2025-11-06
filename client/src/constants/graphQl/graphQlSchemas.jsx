export const querySchemas = {
  getSkills: `
         query {
    allSkills {
      _id
      name
      level
      icon
      category
      description
    }
  }
    `,
  getProjects: `
     query {
    allProjects {
      _id
      title
      description
      technologies
      startDate
      status
      githubUrl
      liveUrl
      image
    }
  }   
    `,
  getCompetences: `
  query{
    allCompetences{
      name
      level
      category
      description
    }
  }
  `,
  getExperiences:`
    query{
      allExperiences{
        title
        company
        startDate
        endDate
        description
        location
        type
      }
    }
  `
};


export const mutationSchemas = {
    loginMutation: `
     mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
   `
}