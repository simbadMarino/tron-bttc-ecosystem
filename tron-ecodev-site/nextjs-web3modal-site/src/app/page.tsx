"use client";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { columns, users } from "./data";
import { abi } from "./constants/abi";
import { Divider } from "@nextui-org/divider";
let web3Modal: any;

const statusColorMap: any = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const providerOptions = {

  walletconnect: {

    package: WalletConnectProvider,
    options: {
      rpc: { 199: "https://rpc.bt.io/" }, //Assigning BTTC Mainnet chain ID and public RPC

    }
  },
}
/*
if (typeof window.ethereum !== "undefined") {

  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // This is required

  });

}*/


export default function Home() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | undefined>(undefined);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const menuItems = [
    "Integration Requests",
    "Problem Reports",

  ];

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions, // This is required

      })
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        setSigner(await provider.getSigner());
      }
      catch (e) {
        console.log(e);
      }

    }
    else {
      setIsConnected(false);
    }
  }

  async function addNewIntegration(_IRTitle: string, _IRDescription: string) {
    if (isConnected) {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        if (_IRTitle != null || _IRDescription != null) { //No empty title OR description are allowed
          await contract.addNewIntegration(_IRTitle, _IRDescription);
        }
        else {
          console.log("Either Title or Description are empty")
        }

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please connect your wallet");
    }

  }
  const renderCell = useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "raisedby":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            name={cellValue}
          >
          </User>
        );
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-600">{user.id}</p>
          </div>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{user.title}</p>
          </div>
        );
      case "votes":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{user.votes}</p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{user.description}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Upvote">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Change Status">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <main color="primary" className="dark flex min-h-screen flex-col items-center justify-between p-2">
      <Navbar disableAnimation isBordered classNames={{
        base: "bg-primary/15 shadow-lg",
      }}>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">TRON Eco Dev</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">TRON Eco Dev</p>
          </NavbarBrand>
          <NavbarItem>
            <Link color="primary" href="#">
              Integration Requests
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="primary" href="#">
              Problem Reports
            </Link>
          </NavbarItem>

        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            {hasMetamask ? (
              isConnected ? (
                <Button isDisabled color="primary" variant="ghost" onClick={() => connect()}>Connected</Button>
              ) : (
                <Button color="primary" variant="ghost" onClick={() => connect()}>Connect Wallet</Button>
              )
            ) : (
              <Button isDisabled color="primary" variant="ghost" onClick={() => connect()}>Wallet Not Detected</Button>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color="primary"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div className="flex h-20 items-center space-x-4 text-small">
        <div><Button onPress={onOpen} color="success">Request Integration</Button></div>
        <Divider orientation="vertical" />
        <div><Button color="warning">Create PR</Button></div>
        <Divider orientation="vertical" />
      </div>

      <>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          className="dark"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Project Integration Request</ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus

                    label="Project name"
                    placeholder="Enter project name"
                    variant="bordered"
                  />
                  <Input

                    label="Description"
                    placeholder="Enter project description"
                    type="description"
                    variant="bordered"
                  />

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Store in blockchain
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>



      <Table aria-label="Integration Requests Feedback" className="justify-between p-25" >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

    </main>
  );
}
