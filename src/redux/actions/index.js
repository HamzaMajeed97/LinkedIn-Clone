export const GET_PROFILES = "GET_PROFILES";
export const GET_ACTUAL_PROFILE = "GET_ACTUAL_PROFILE";
export const UPLOAD_IMAGE_PROFILE = "UPLOAD_IMAGE_PROFILE";
export const LOADED_PROFILES = "LOADED_PROFILES";
export const GET_PROFILES_ERROR = "GET_PROFILES_ERROR";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const GET_EXPERIENCES = "GET_EXPERIENCES";
export const GET_SINGLE_EXPERIENCE = "GET_SINGLE_EXPERIENCE";
export const CREATE_EXPERIENCE = "CREATE_EXPERIENCE";
export const UPLOAD_IMAGE_EXPERIENCE = "UPLOAD_IMAGE_EXPERIENCE";
export const DELETE_EXPERIENCE = "DELETE_EXPERIENCE";
export const LOADED_EXPERIENCES = "LOADED_EXPERIENCES";
export const GET_EXPERIENCES_ERROR = "GET_EXPERIENCES_ERROR";
export const UPDATE_EXPERIENCE = "UPDATE_EXPERIENCE";
export const GET_POSTS = "GET_POSTS";
export const GET_SINGLE_POST = "GET_SINGLE_POST";
export const CREATE_POST = "CREATE_POST";
export const UPLOAD_IMAGE_POST = "UPLOAD_IMAGE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const LOADED_POSTS = "LOADED_POSTS";
export const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const endpointApi = "https://striveschool-api.herokuapp.com/api";

const keyprofilo =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzU5MDc4ZjdjNDRjZTAwMTUzOTBjNGMiLCJpYXQiOjE2NjY3NzkwMjQsImV4cCI6MTY2Nzk4ODYyNH0.ysGVMurkC208SH9EgpzeiYhJvFCsIPQgrRlOlLcMiJ0";

  



  
//note: actions per il profilo
export const getProfilesAction = () => {
  return (dispatch, getState) => {
    fetch(`${endpointApi}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        // console.log(data)
     

        dispatch({
          type: GET_PROFILES,
          payload: data,
        });
        setTimeout(() => {
          dispatch({
            type: LOADED_PROFILES,
          });
        }, 200);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED_PROFILES,
        });
        dispatch({
          type: GET_PROFILES_ERROR,
        });
      });
  };
};

export const getActualProfileAction = (userID) => {
  return (dispatch, getState) => {
    fetch(`${endpointApi}/profile/${userID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch({
          type: GET_ACTUAL_PROFILE,
          payload: data,
        });
       

        setTimeout(() => {
          dispatch({
            type: LOADED_PROFILES,
          });
        }, 200);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED_PROFILES,
        });
        dispatch({
          type: GET_PROFILES_ERROR,
        });
      });
  };
};

export const uploadImageProfileAction = (formData) => {
  return (dispatch, getState) => {
    const userID = getState().profile.actualProfile._id;
    fetch(`${endpointApi}/profile/${userID}/picture`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch(getActualProfileAction());
        // setTimeout(() => {
        //     dispatch({
        //         type: LOADED_PROFILES,
        //     });
        // }, 200);
      })
      .catch((error) => {
        console.log(error);
        // dispatch({
        //     type: LOADED_PROFILES,
        // });
        // dispatch({
        //     type: GET_PROFILES_ERROR,
        // });
      });
  };
};

export const updateProfileAction = (data) => {
  return (dispatch, getState) => {
    fetch(`${endpointApi}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyprofilo}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch(getActualProfileAction(result));
        // setTimeout(() => {
        //     dispatch({
        //         type: LOADED_PROFILES,
        //     });
        // }, 200);
      })
      .catch((error) => {
        console.log(error);
        // dispatch({
        //     type: LOADED_PROFILES,
        // });
        // dispatch({
        //     type: GET_PROFILES_ERROR,
        // });
      });
  };
};

//note: actions per le experiences
export const getExperiencesAction = () => {
  return (dispatch, getState) => {
    const userID = getState().profile.actualProfile._id;
    fetch(`${endpointApi}/profile/${userID}/experiences`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_EXPERIENCES,
          payload: data,
        });
        setTimeout(() => {
          dispatch({
            type: LOADED_EXPERIENCES,
          });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED_EXPERIENCES,
        });
        dispatch({
          type: GET_EXPERIENCES_ERROR,
        });
      });
  };
};

export const getSingleExperienceAction = (expID) => {
  return (dispatch, getState) => {
    const userID = getState().profile.actualProfile._id;
    fetch(`${endpointApi}/profile/${userID}/experiences/${expID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: GET_SINGLE_EXPERIENCE,
          payload: data,
        });
        setTimeout(() => {
          dispatch({
            type: LOADED_EXPERIENCES,
          });
        }, 200);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED_EXPERIENCES,
        });
        dispatch({
          type: GET_EXPERIENCES_ERROR,
        });
      });
  };
};

export const createExperienceAction = (data, formData) => {
  return (dispatch, getState) => {
    const userID = getState().profile.actualProfile._id;
    fetch(`${endpointApi}/profile/${userID}/experiences`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
          console.log(result)
        if (formData) {
          dispatch(uploadImageExperienceAction(result._id, formData));
        }
        dispatch(getExperiencesAction(data)); //aggiorna lo store dopo le operazioni di crud
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
};

export const updateExperienceAction = (experience, data) => {
  return (dispatch, getState) => {
    const userID = getState().profile.actualProfile._id;
    fetch(`${endpointApi}/profile/${userID}/experiences/${experience._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyprofilo}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(getExperiencesAction(response)); //aggiorna lo store dopo le operazioni di crud
      })
      .catch((error) => console.log(error));
  };
};

export const uploadImageExperienceAction = (expID, formData) => {
  return (dispatch, getState) => {
    const userID = getState().profile.actualProfile._id;
    fetch(`${endpointApi}/profile/${userID}/experiences/${expID}/picture`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(getPostsAction); //aggiorna lo store dopo le operazioni di crud
      })
      .catch((error) => console.log(error));
  };
};

export const deleteExperienceAction = (experience) => {
  return (dispatch, getState) => {
    const userID = getState().profile.actualProfile._id;
    fetch(`${endpointApi}/profile/${userID}/experiences/${experience._id}`, {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
    // .then((response) => {
    //   if(response.ok){
    //     console.log("eliminato")
    //     dispatch(getExperiencesAction(experience))
    //     console.log(dispatch(getExperiencesAction))
    //   }
    // })
      // .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(getExperiencesAction(experience)); //aggiorna lo store dopo le operazioni di crud
        // dispatch({
        //     type: DELETE_EXPERIENCE,
        //     payload: experience._id
        // });
        // setTimeout(() => {
        //     dispatch({
        //         type: LOADED_EXPERIENCES,
        //     });
        // }, 200);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED_EXPERIENCES,
        });
        dispatch({
          type: GET_EXPERIENCES_ERROR,
        });
      });
  };
};

//note: actions per i post
export const getPostsAction = () => {
  return (dispatch, getState) => {
    fetch(`${endpointApi}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_POSTS,
          payload: data.slice(-100).reverse(),
        });
        setTimeout(() => {
          dispatch({
            type: LOADED_POSTS,
          });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED_POSTS,
        });
        dispatch({
          type: GET_POSTS_ERROR,
        });
      });
  };
};

export const getSinglePostAction = (postID) => {
  return (dispatch, getState) => {
    fetch(`${endpointApi}posts/${postID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: GET_SINGLE_POST,
          payload: data,
        });
        setTimeout(() => {
          dispatch({
            type: LOADED_POSTS,
          });
        }, 200);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED_POSTS,
        });
        dispatch({
          type: GET_POSTS_ERROR,
        });
      });
  };
};

export const createPostAction = (data, formData) => {
  return (dispatch, getState) => {
    fetch(`${endpointApi}/posts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (formData) {
          console.log("sono dentro la action di creazione post");
          dispatch(uploadImagePostAction(result._id, formData));
        }
        dispatch(getPostsAction(data)); //aggiorna lo store dopo le operazioni di crud
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
};

export const updatePostAction = (postID, data) => {
  return (dispatch, getState) => {
    fetch(`${endpointApi}/posts/${postID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyprofilo}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(getPostsAction(postID)); //aggiorna lo store dopo le operazioni di crud
      })
      .catch((error) => console.log(error));
  };
};

export const uploadImagePostAction = (postID, formData) => {
  return (dispatch, getState) => {
    fetch(`${endpointApi}/posts/${postID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${keyprofilo}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(getPostsAction); //aggiorna lo store dopo le operazioni di crud
      })
      .catch((error) => console.log(error));
  };
};

export const deletePostAction = (postID) => {
  return (dispatch, getState) => {
    fetch(`${endpointApi}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${keyprofilo}`,
      },
    })
    // .then((response) => {
    //   if(response.ok){
    //     dispatch(getPostsAction(postID))
    //     console.log("post eliminato")
    //     console.log(dispatch(getPostsAction))
    //   }
    // })
      // .then((res) => res.json())
      .then((result) => {
        console.log(result);
        dispatch(getPostsAction(postID)); //aggiorna lo store dopo le operazioni di crud
        // dispatch({
        //     type: DELETE_EXPERIENCE,
        //     payload: experience._id
        // });
        // setTimeout(() => {
        //     dispatch({
        //         type: LOADED_EXPERIENCES,
        //     });
        // }, 200);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED_POSTS,
        });
        dispatch({
          type: GET_POSTS_ERROR,
        });
      });
  };
};
