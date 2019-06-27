import { getAccessToken } from './getAccessToken';
import { getGitHubUser } from './getGitHubUser';
import { getJWT } from './getJWT';
import asyncHandler from 'express-async-handler';
import { ErrorResponse } from '../ErrorResponse';

const authGitHub = async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    const gitHubUser = await getGitHubUser(accessToken);
    const vizHubJWT = await getJWT(gitHubUser);

    // TODO set cookie here
    res.send({ vizHubJWT });
  } catch (error) {
    res.send(ErrorResponse(error));
  }
};

export const auth = app => {
  app.post('/api/auth/github', asyncHandler(authGitHub));
};

//        return fetch('https://api.github.com/user', {
//          method: 'GET',
//          mode: 'cors',
//          headers: {
//            Accept: 'application/json',
//            'Content-Type': 'application/json',
//            Authorization: `token ${accessToken}`,
//          },
//        })
//          .then(response => response.json())
//          .then(data => {
//            console.log(data);
//            // storing user profile for creating access token
//            const user = {
//              user: data.login,
//              id: data.id,
//            };
//
//            // generating jwt token with expired in 24 hour and sending to front
//            jwt.sign(
//              user,
//              process.env.JWT_SECRET,
//              {expiresIn: 60 * 60 * 24},
//              (err, token) => {
//                res.json({
//                  token,
//                });
//                console.log('l' + token);
//              },
//            );
//          });
//      .catch(error => {
//        console.log(error);
//      });
//      })
