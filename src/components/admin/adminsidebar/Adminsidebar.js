import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { ListItemText } from '@material-ui/core'

function AdminSideBar({ items }) {
    return (
        <>
           <List disablePadding dense>
               {items.map(({label, name, ...rest}) => (
                   <ListItem key={name} button {...rest}>
                        <ListItemText>{label}</ListItemText>
                   </ListItem>
               ))}
           </List>
        </>
    )
}

export default AdminSideBar
