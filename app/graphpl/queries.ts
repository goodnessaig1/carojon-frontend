import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      email
      fullname
      userType
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS_WITH_BUSINESS_DETAILS = gql`
  query {
    getBusinessManagers {
      id
      email
      fullname
      userType
      business {
        id
        name
        description
      }
    }
  }
`;

export const GET_USER_WITH_BUSINESS = gql`
  query GetUserWithBusiness($userId: Int!) {
    userWithBusiness(userId: $userId) {
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

export const GET_SERVICES_BY_BUSINESS_ID = gql`
  query GetServicesByBusinessId($businessId: Int!) {
    getServicesByBusinessId(businessId: $businessId) {
      id
      name
      price
      description
    }
  }
`;

export const GET_GIFT_CARDS_BY_BUSINESS_ID = gql`
  query GetGiftCardsByBusinessId($businessId: Int!) {
    getGiftCardsByBusinessId(businessId: $businessId) {
      id
      title
      amount
      image
      isActive
    }
  }
`;

export const GET_ORDERS_BY_USER = gql`
  query GetOrdersByUser($userId: Int!) {
    getOrdersByUser(userId: $userId) {
      id
      userId
      giftCardId
      giftCard {
        id
        title
        image
        isActive
        amount
      }
    }
  }
`;
