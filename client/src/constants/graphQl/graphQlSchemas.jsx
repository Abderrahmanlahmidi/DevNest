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
  getExperiences: `
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
  `,
  userSkillsQuery: {
    getUserSkills: `
    query GetUserSkills($userId: ID!) {
    userSkills(userId: $userId) {
      _id   
      name
      level
      category
      description
      icon
    }
  }
    `,
    getSkill:`
  query GetSkill($id: ID!) {
    skill(id: $id) {
      _id
      name
      level
      category
      description
      icon
    }
  }
`
  },
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
   `,
  SkillsMutation: {
    deleteSkillMutation: `
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id) {
    _id
  }
  }
`,
    updateSkillMutation:`
  mutation UpdateSkill($id: ID!, $name: String, $level: String, $category: String, $description: String, $icon: String) {
    updateSkill(id: $id, name: $name, level: $level, category: $category, description: $description, icon:$icon) {
      _id
      name
      level
      category
      description
      icon
    }
  }
`,

  },
};
