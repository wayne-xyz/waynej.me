import socket
import sys

def is_port_available(port):
    try:
        # Create a socket object
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Try to bind to the port
        sock.bind(('localhost', port))
        
        # If we get here, the port is available
        sock.close()
        return True
    except socket.error:
        # If we get a socket error, the port is in use
        return False

def main():
    if len(sys.argv) != 2:
        print("Usage: python check_port.py <port_number>")
        sys.exit(1)
    
    try:
        port = int(sys.argv[1])
        if port < 0 or port > 65535:
            print("Error: Port number must be between 0 and 65535")
            sys.exit(1)
            
        if is_port_available(port):
            print(f"Port {port} is available!")
        else:
            print(f"Port {port} is already in use!")
    except ValueError:
        print("Error: Please provide a valid port number")
        sys.exit(1)

if __name__ == "__main__":
    main()
