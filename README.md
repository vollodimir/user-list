# React Users Data

Projekt hosted <a href="http://user-list.pl.vn.ua/">user-list.pl.vn.ua</a>.

## Description

The application has a table of users. The table has columns with specific data.
The "Select Columns" button allows you to select which columns to display. For convenience, there is a search in the list of available columns. Selected columns have a delete column button.

## Mission

The application is useful for the convenience of displaying a list of users inside control systems.

## For developers

User data comes from https://mockapi.io/
Search by columns works by filtering the list in frontend.
DnD works using the library <a href="https://github.com/atlassian/react-beautiful-dnd">react-beautiful-dnd</a> (functionality was developed using Mouse Events, but they did not work on the mobile version)
Pagination works with a request to the backend

### Stored in Redux Toolkit:

<ul>
  <li>User data</li>
  <li>Pagination</li>
  <li>All columns</li>
  <li>Popup window state</li>
</ul>

## In future

<ul>
  <li>Editing Users</li>
  <li>User search</li>
  <li>Sort by column</li>
</ul>
