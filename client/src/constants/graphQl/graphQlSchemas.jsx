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
      _id
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
        _id
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
    getSkill: `
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
`,
  },
 getCompetence: `
  query GetCompetence($id: ID!) {
    competence(id: $id) {
      _id
      name
      level
      category
      description
      userId
    }
  }
`,

experience: `
    query GetExperience($id: ID!) {
      experience(id: $id) {
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
project: `
    query GetProject($id: ID!) {
      project(id: $id) {
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
    updateSkillMutation: `
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
    createSkillMutation: `
  mutation CreateSkill($name: String!, $level: String, $category: String, $description: String, $icon: String, $userId: ID!) {
    createSkill(name: $name, level: $level, category: $category, description: $description, icon: $icon, userId: $userId) {
      _id
      name
      level
      category
      description
      icon
      userId
    }
  }
`,
  },

  CompetencesMutation: {
    deleteCompetenceMutation: `
    mutation DeleteCompetence($id: ID!) {
      deleteCompetence(id: $id) {
        _id
      }
    }
  `,

    updateCompetenceMutation: `
    mutation UpdateCompetence($id: ID!, $name: String, $level: String, $category: String, $description: String) {
      updateCompetence(id: $id, name: $name, level: $level, category: $category, description: $description) {
        _id
        name
        level
        category
        description

      }
    }
  `,

    createCompetenceMutation: `
    mutation CreateCompetence($name: String!, $level: String, $category: String, $description: String, $userId: ID!) {
      createCompetence(name: $name, level: $level, category: $category, description: $description, userId: $userId) {
        _id
        name
        level
        category
        description
        userId
      }
    }
  `,
  },
  ExperiencesMutation: {
    createExperienceMutation: `
    mutation CreateExperience(
      $title: String!,
      $company: String,
      $startDate: String,
      $endDate: String,
      $description: String,
      $location: String,
      $type: String,
      $userId: ID!
    ) {
      createExperience(
        title: $title,
        company: $company,
        startDate: $startDate,
        endDate: $endDate,
        description: $description,
        location: $location,
        type: $type,
        userId: $userId
      ) {
        _id
        title
        company
        startDate
        endDate
        description
        location
        type
        userId
      }
    }
  `,

    updateExperienceMutation: `
    mutation UpdateExperience(
      $id: ID!,
      $title: String,
      $company: String,
      $startDate: String,
      $endDate: String,
      $description: String,
      $location: String,
      $type: String
    ) {
      updateExperience(
        id: $id,
        title: $title,
        company: $company,
        startDate: $startDate,
        endDate: $endDate,
        description: $description,
        location: $location,
        type: $type
      ) {
        _id
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

    deleteExperienceMutation: `
    mutation DeleteExperience($id: ID!) {
      deleteExperience(id: $id) {
        _id
      }
    }
  `,
  },


  ProjectMutation: {
    createProjectMutation: `
    mutation CreateProject(
      $title: String!
      $description: String
      $technologies: String
      $startDate: String
      $status: String
      $githubUrl: String
      $liveUrl: String
      $image: String
      $userId: ID!
    ) {
      createProject(
        title: $title
        description: $description
        technologies: $technologies
        startDate: $startDate
        status: $status
        githubUrl: $githubUrl
        liveUrl: $liveUrl
        image: $image
        userId: $userId
      ) {
        _id
        title
        description
        technologies
        startDate
        status
        githubUrl
        liveUrl
        image
        userId
        createdAt
        updatedAt
      }
    }
  `,

    updateProjectMutation: `
    mutation UpdateProject(
      $id: ID!
      $title: String
      $description: String
      $technologies: String
      $startDate: String
      $status: String
      $githubUrl: String
      $liveUrl: String
      $image: String
    ) {
      updateProject(
        id: $id
        title: $title
        description: $description
        technologies: $technologies
        startDate: $startDate
        status: $status
        githubUrl: $githubUrl
        liveUrl: $liveUrl
        image: $image
      ) {
        _id
        title
        description
        technologies
        startDate
        status
        githubUrl
        liveUrl
        image
        userId
        createdAt
        updatedAt
      }
    }
  `,

    deleteProjectMutation: `
    mutation DeleteProject($id: ID!) {
      deleteProject(id: $id) {
        _id
      }
    }
  `,
  },
};
