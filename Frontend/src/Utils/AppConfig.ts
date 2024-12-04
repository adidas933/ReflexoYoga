class AppConfig {
  // Backend urls:
  public readonly registerUrl = 'http://localhost:4000/api/register/';
  public readonly loginUrl = 'http://localhost:4000/api/login/';
  public readonly checkEmailUrl = 'http://localhost:4000/api/check-email/';
  public readonly bookingsUrl = 'http://localhost:4000/api/bookings/';

  //Axios options:
  public readonly axiosOptions = {
    headers: {
      // Tell axios to also send the image:
      'Content-Type': 'multipart/form-data', // We're sending also files.
    },
  };
}

export const appConfig = new AppConfig();
