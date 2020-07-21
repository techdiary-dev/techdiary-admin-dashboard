import { gql } from '@apollo/client';

export const ME = gql`
    query ME {
        getAdmin {
            name
            username
            email
        }
    }
`;
