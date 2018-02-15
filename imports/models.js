import { Mongo } from 'meteor/mongo';

export const Tellers = new Mongo.Collection('teller');
export const Stories = new Mongo.Collection('story');
export const Subjects = new Mongo.Collection('subject');
