import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
      email
      fullname
      userType
      createdAt
      updatedAt
      business {
        id
        name
        description
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      status
      statusCode
      user {
        id
        email
        fullname
        userType
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_GIFT_CARD = gql`
  mutation CreateGiftCard($input: CreateGiftCardInput!) {
    createGiftCard(createGiftCardInput: $input) {
      id
      title
      amount
      image
      businessId
      isActive
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation CreateService($input: CreateServiceInput!) {
    createService(createServiceInput: $input) {
      id
      price
      description
      name
      businessId
    }
  }
`;

export const CREATE_PAYMENTl = gql`
  mutation CreatePayment($userId: Int!, $giftCardId: Int!) {
    createPayment(
      createPaymentInput: { userId: $userId, giftCardId: $giftCardId }
    ) {
      id
      userId
      giftCardId
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(createPaymentInput: $input) {
      id
      userId
      giftCardId
    }
  }
`;

export const DEACTIVATE_GIFT_CARD = gql`
  mutation DeactivateGiftCard($id: Int!) {
    deactivateGiftCard(id: $id) {
      id
      title
      isActive
    }
  }
`;
