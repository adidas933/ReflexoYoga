class AppConfig {
  // Backend urls:
  public readonly vacationsUrl = 'http://localhost:4000/api/vacations/';

  public readonly vacationsByUserIdUrl =
    'http://localhost:4000/api/vacations-by-user-id/';

  public readonly addVacationUrl = 'http://localhost:4000/api/vacations/';

  public readonly registerUrl = 'http://localhost:4000/api/register/';

  public readonly loginUrl = 'http://localhost:4000/api/login/';

  public readonly likesUrl = 'http://localhost:4000/api/likes/'; // URL for likes

  // You might want to add specific URLs for like actions
  public readonly addLikeUrl = 'http://localhost:4000/api/likes/add/';
  public readonly getAllLikesUrl = 'http://localhost:4000/api/likes/';
  public readonly removeLikeUrl = 'http://localhost:4000/api/likes/remove/';

  public readonly checkEmailUrl = 'http://localhost:4000/api/check-email/';
  public readonly vacationImagesUrl = 'http://localhost:4000/api/vacations/images/'; // Base URL for vacation images



  //Axios options:
  public readonly axiosOptions = {
    headers: {
      // Tell axios to also send the image:
      'Content-Type': 'multipart/form-data', // We're sending also files.
    },
  };
}

export const appConfig = new AppConfig();
