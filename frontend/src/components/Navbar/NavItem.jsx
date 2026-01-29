import { useState, useRef, useContext } from "react";
import { Button, Box, Popper, Paper, ClickAwayListener, useMediaQuery, useTheme, Stack, Collapse, } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AppContext from "../../Context/AppContext";

function NavItem({ page, depth = 0 }) {
    const [open, setOpen] = useState(false);
    const { isDarkTheme } = useContext(AppContext);
    const anchorRef = useRef(null);
    const hasChildren = Boolean(page?.children);
    const isTopLevel = depth === 0;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box
                ref={anchorRef}
                onMouseEnter={isDesktop ? handleOpen : undefined}
                onMouseLeave={isDesktop ? handleClose : undefined}
                sx={{ position: "relative" }}
            >
                <Button
                    onClick={isDesktop ? undefined : () => setOpen(!open)}
                    sx={{
                        color: isDarkTheme ? "#fff" : "#000",
                        textAlign: "left",
                        maxWidth: {xs: "60", sm:"", md: "50vw"},
                        whiteSpace: "normal",
                        "&:hover": { bgcolor: isDarkTheme ? "#202020" : "#f0f0f0" },

                    }}
                >
                    {page.name}
                    {hasChildren && (
                        open ? <ArrowDropDownIcon /> : <ArrowRightIcon />
                    )}
                </Button>

                {hasChildren && isDesktop && (
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        placement={isTopLevel ? "bottom-start" : "right-start"}
                        disablePortal={false}
                        modifiers={[
                            { name: "offset", options: { offset: [0, 0] } },
                            { name: "preventOverflow", options: { boundary: "viewport" } },
                        ]}
                        style={{ zIndex: 1300 }}
                    >
                        <Paper
                            sx={{
                                bgcolor: isDarkTheme ? "#000" : "#fff",
                                color: isDarkTheme? "#fff" : "#000",
                                boxShadow: 3,
                                borderRadius: 1,
                                maxHeight: "70vh",
                                overflowY: "auto"
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

                {hasChildren && !isDesktop && (
                    <Box sx={{ width: "100%" }}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Stack
                                sx={{
                                    width: "100%",
                                    alignItems: "flex-start",
                                    maxWidth: "100%",
                                    overflowWrap: "break-word",
                                    pl: 2
                                }}
                            >
                                {page.children.map((child) => (
                                    <NavItem key={child.name} page={child} depth={depth + 1} isMobile />
                                ))}
                            </Stack>
                        </Collapse>
                    </Box>
                )}
            </Box>
        </ClickAwayListener>
    );
}

export default NavItem;
