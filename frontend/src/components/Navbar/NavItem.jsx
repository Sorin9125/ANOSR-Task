import { useState, useRef } from "react";
import { Button, MenuItem, Box, Popper, Paper, ClickAwayListener, useMediaQuery, useTheme, Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function NavItem({ page, depth = 0 }) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const hasChildren = Boolean(page?.children);
    const isTopLevel = depth === 0;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const handleOpen = () => hasChildren && setOpen(true);
    const handleClose = () => setOpen(false);

    const Trigger = isTopLevel ? Button : MenuItem;

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box
                ref={anchorRef}
                onMouseEnter={isDesktop ? handleOpen : undefined}
                onMouseLeave={isDesktop ? handleClose : undefined}
                sx={{ display: "inline-block", position: "relative" }}
            >
                <Trigger
                    onClick={isDesktop ? undefined : () => setOpen(!open)}
                    sx={{
                        color: "black",
                        textTransform: "none",
                        fontWeight: "bold",
                        minWidth: isTopLevel ? "auto" : 150,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "&:hover": { bgcolor: "#f0f0f0" },
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flex: 1,
                        fontVariant: {xs: "body1"}
                    }}>
                        {page.name}
                        {hasChildren &&
                            (isTopLevel ? <ArrowDropDownIcon fontSize="small" /> : <ArrowRightIcon fontSize="small" />)}
                    </Box>
                </Trigger>

                {hasChildren && (
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        placement="bottom-start"
                        disablePortal
                        modifiers={[
                            { name: "offset", options: { offset: [0, 0] } },
                            { name: "preventOverflow", options: { boundary: "viewport" } },
                        ]}
                        style={{ zIndex: 1300 }}
                    >
                        <Paper
                            onMouseEnter={isDesktop ? handleOpen : undefined}
                            onMouseLeave={isDesktop ? handleClose : undefined}
                            sx={{
                                bgcolor: "#fff",
                                color: "black",
                                boxShadow: 3,
                                borderRadius: 1,
                                py: 0,
                                minWidth: 150,
                            }}
                        >
                            <Stack spacing={0}>
                                {page.children.map((child) => (
                                    <NavItem key={child.name} page={child} depth={depth + 1} />
                                ))}
                            </Stack>
                        </Paper>
                    </Popper>
                )}
            </Box>
        </ClickAwayListener>
    );
}

export default NavItem;
